'use strict'
require('../check-versions')();

process.env.NODE_ENV = 'production'

const ora = require('ora');
const del = require('del');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('../webpack.conf/prod.conf');

const pack = (cb) => {
  let spinner = ora('building for production...');
  spinner.start();
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))

    cb && cb();
  });
}

module.exports = function (cb) {
  del([
      path.join(config.build.assetsRoot, config.build.assetsSubDirectory),
      path.join(config.build.assetsRoot,'*.html')
    ])
    .then(err => {
    pack(cb);
  }).catch(err => {
    throw err;
  });
}
