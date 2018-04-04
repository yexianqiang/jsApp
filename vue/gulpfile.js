const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');

const gulp = require('gulp');
const opn = require('opn');
const co = require('co');
const OSS = require('ali-oss');
const request = require('request');
const SMB2 = require('smb2');
const notifier = require('node-notifier');
const chalk = require('chalk');
const ping = require('ping');
require('del');

// 初始化环境变量
process.noDeprecation = true;

const localEnv = require('./env');

let exts = [
  'css', 'map', 'jpg', 'jpeg', 'png', 'gif',
  'svg', 'otf', 'eot', 'ttf', 'woff', 'woff2'
];

const distPath = path.join(process.cwd(), './dist');
const staticPath = path.join(distPath, 'static');

/*
 |------------------------------------------------------------------------
 | Loop Files & Upload File to server
 |------------------------------------------------------------------------
 */

let uploadStaticFiles = function (ossClient, staticDir, cb, queue) {

  queue = queue === undefined ? []: queue;

  fs.readdir(staticDir, function (error, files) {
    for (var i = 0; i < files.length; i++) {
      var fileName = path.join(staticDir, files[i]);
      (function (fileName) {
        fs.stat(fileName, function (error, stats) {
          if (error) {
            throw error;
          }

          if (stats.isDirectory()) {
            // 继续遍历
            uploadStaticFiles(ossClient, fileName, cb, queue);
          } else {
            let fileExt = path.extname(fileName),
              allow = false;
            for (let i in exts) {
              let ext = exts[i];
              if ((new RegExp('\\.'+ ext+ '$')).test(fileName)) {
                allow = true;
                break;
              }
            }

            if (!allow) {
              queue.pop();
              queue.length == 0 && cb();
              console.log(chalk.green('文件无需上传:')+ fileName);
              return ;
            }

            co(function *() {
              var saveName = path.relative(staticPath, fileName);
              saveName = saveName.replace(/\\/g, '/');

              let options = {};

              if (fileExt == '.gz') {
                options = {
                  headers: {
                    'Content-Encoding': 'gzip'
                  }
                };
                saveName = saveName.replace(fileExt, '');
              }

              var result = yield ossClient.put(saveName, fileName, options);

              queue.pop();
              queue.length == 0 && cb();
              console.log(chalk.green('文件上传完成:')+ fileName);

            }).catch(function (err) {
              throw err;
            });
          }
        });
      }(fileName));
    }
  });
}

// 读取并上传编译后文件
const readAndUploadStatic = function (ossClient) {
  return new Promise(function (resolve, reject) {
    uploadStaticFiles(ossClient, staticPath, resolve);
  });
}

const sendHtmlToSamba = function () {

  // 上传 html
  const smb2Client = new SMB2({
    share:'\\\\192.168.1.150\\zzhedu',
    domain:'WORKGROUP',
    username:'guest',
    password:''
  });

  let sendFilesBySmb = function (files, index, cb) {

    if (index >= files.length ) {
      return cb();
    }

    let filename = files[index];
    let fullName = path.join(distPath, files[index]);

    let filestat = fs.statSync(fullName);

    if (filestat.isDirectory()) {
      return sendFilesBySmb(files, ++index, cb);
    }

    let ext = path.extname(filename);

    if (ext != '.html') {
      console.log(chalk.green('文件无需上传:')+ fullName);
    }

    let fileBuffer = fs.readFileSync(fullName);

    smb2Client.writeFile('html\\wx\\'+ filename, fileBuffer, function (error, data) {
      if(error) throw error;

      console.log(chalk.green('Samba上传完成:')+ fullName);
      return sendFilesBySmb(files, ++index, cb);
    });
  }

  return new Promise(function (resolve, reject) {
    fs.readdir(distPath, function (error, files) {
      sendFilesBySmb(files, 0, resolve);
    });
  });
}

const cacheManifest = function (source) {
  let api = 'http://apiv2.zhizihua.com/util/cache-fefiles';
  let token = 'sSSeGwxjeUosEd2soXjzyqrxzBRCN5BU';

  if (source == 'test') {
    api = 'http://apiv2.test.zhizihua.com/util/cache-fefiles';
    token = 'nbY6ikRYUU5c3zGrnt2JrYRmxLJNrw6R';
  }

  let manifest = require('./dist/manifest.json');

  return new Promise(function (resolve, reject) {
    request.post({url: api, form: {
      token: token,
      manifest: JSON.stringify(manifest)
    }}, function (err, httpResponse, body) {
      if (err) throw err;
      console.log(chalk.green('manifest上传完成:'));
      resolve();
    });
  });
}

/*
 |------------------------------------------------------------------------
 | Compress files & Upload to production server
 |------------------------------------------------------------------------
 */
gulp.task('build', function (cb) {

  let prodBuilder = require('./build/compile/prod');

  prodBuilder(function () {
    // 初始化 OSS 客户端
    let ossClient = new OSS({
      region: localEnv.ossConfig.OSS_REGION,
      accessKeyId: localEnv.ossConfig.OSS_ACCESS_KEY,
      accessKeySecret: localEnv.ossConfig.OSS_APP_SECRET,
      bucket: 's2-zhizihua-com',
    });

    console.log(chalk.green('编译完成, 开始上传文件:'));

    // exts.push('js\\.gz');
    exts.push('js');

    // 读取并上传编译后文件
    readAndUploadStatic(ossClient)
      // 上传 mnifest
      .then(cacheManifest('prod'))
      // 上传 html
      // .then(function () {
      //   return sendHtmlToSamba()
      // })
      .then(function () {
        notifier.notify('Prod 编译完成!');
      })
      .catch(function (e) {
        throw e;
      });
  });
});

/*
 |------------------------------------------------------------------------
 | Compress files & Upload to test server
 |------------------------------------------------------------------------
 */
gulp.task('test', function () {
  let testBuilder = require('./build/compile/test');

  testBuilder(function () {
    // 初始化 OSS 客户端
    let ossClient = new OSS({
      region: localEnv.ossConfig.OSS_REGION,
      accessKeyId: localEnv.ossConfig.OSS_ACCESS_KEY,
      accessKeySecret: localEnv.ossConfig.OSS_APP_SECRET,
      bucket: 's2-test-zhizihua-com',
    });

    console.log(chalk.green('编译完成, 开始上传文件:'));

    exts.push('js');

    // 读取并上传编译后文件
    readAndUploadStatic(ossClient)
      // 缓存 Manifest
      .then(function () {
          return cacheManifest('test')
      })
      // 上传 html
      .then(function () {
        return sendHtmlToSamba()
      })
      .then(function () {
        notifier.notify('Test 编译完成!');
      })
      .catch(function (e) {
        throw e;
      });
  });
});

/*
 |------------------------------------------------------------------------
 | Compress files to dist
 |------------------------------------------------------------------------
 */


gulp.task('dist', function (cb) {
  prodBuilder();
});

/*
 |------------------------------------------------------------------------
 | Start up dev server
 |------------------------------------------------------------------------
*/
gulp.task('dev', function () {
  require('./build/compile/dev');
});

/*
 |--------------------------------------------------------------------------
 | Start up node-inspector
 |--------------------------------------------------------------------------
 */
gulp.task('debug', function() {
  var debugProcess = childProcess.exec('node-inspector', {
    cwd: process.cwd(),
    detached: true
  });

  opn('http://127.0.0.1:9002/?port=5858');

  debugProcess.stdout.on('data', (data) => {
    // console.log(`Debug-Stdout: ${data}`);
  });

  debugProcess.stderr.on('data', (data) => {
    console.log(`Debug-Stderr: ${data}`);
  });
});

/*
 |--------------------------------------------------------------------------
 | Watch css\js files then rebuild them
 |--------------------------------------------------------------------------
 */
gulp.task('watch', function() {});


gulp.task('default', ['dev']);
