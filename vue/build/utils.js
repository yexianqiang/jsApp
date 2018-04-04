'use strict'
const path = require('path')
const config = require('./config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const StringReplacePlugin = require("string-replace-webpack-plugin")

exports.assetsPath = function (_path) {
  let assetsSubDirectory;

  switch (process.env.NODE_ENV) {
    case 'test':
      assetsSubDirectory = config.test.assetsSubDirectory;
      break;
    case 'production':
      assetsSubDirectory = config.build.assetsSubDirectory;
      break;
    default:
      assetsSubDirectory = config.dev.assetsSubDirectory;
  }

  return path.posix.join(assetsSubDirectory, _path)
}

exports.assetsPublic = function (_path) {
  let publicDomain = config.dev.onlinePublicDomain;

  if (process.env.NODE_ENV === 'production') {
    publicDomain = config.build.onlinePublicDomain;
  }

  if (process.env.NODE_ENV === 'test') {
    publicDomain = config.test.onlinePublicDomain;
  }

  return publicDomain+ '/'+ _path+ '/';
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    sass: generateLoaders('sass'),
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }


  output.push({
    test: /zhizihua(\/|\\)config.js$/,
    exclude: /node_modules/,
    loader: StringReplacePlugin.replace({
      replacements: [
        {
          pattern: /env\-inject\-here/ig,
          replacement: function (match, p1, offset, string) {
            return process.env.NODE_ENV;
          }
        }
      ]})
  });

  return output
}
