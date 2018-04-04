'use strict'
const path = require('path')
const utils = require('../utils')
const config = require('../config')
const vueLoaderConfig = require('../vue-loader.conf')
const StringReplacePlugin = require("string-replace-webpack-plugin")

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const lodalEnv = require('../../env');

module.exports = {
  entry: lodalEnv.entry,
  output: {
    path: path.join(process.cwd(), '../../dist/'),
    publicPath: '/',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        options: {}
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          useRelativePath: true,
          outputPath: 'static/img/',
          publicPath: utils.assetsPublic('img'),
          name: '[name]-[hash].[ext]',
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          useRelativePath: true,
          outputPath: 'static/media/',
          publicPath: utils.assetsPublic('media'),
          name: '[name]-[hash].[ext]',
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          useRelativePath: true,
          outputPath: 'static/fonts/',
          publicPath: utils.assetsPublic('fonts'),
          name: '[name]-[hash].[ext]',
        }
      }
    ]
  },
  plugins: [
    new StringReplacePlugin(),
  ]
}
