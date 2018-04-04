'use strict'
const path = require('path');
const utils = require('../utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPluginAlterAssetTags = require('../library/html-webpack-plugin-alter-asset-tags');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const soloveHtmlPlugin = require('../library/solove-html-plugin');
const erudaPlugin = require('../library/eruda-webpack-plugin');

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.test.productionSourceMap,
      extract: true
    })
  },
  devtool: config.test.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.test.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../../node_modules')
          ) === 0
        )
      }
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../../static'),
        to: config.test.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new ManifestPlugin({
      fileName: 'manifest.json',
      basePath: '/',
      filter: function (option) {
        return /\.(js|css)$/.test(option.name);
      },
      map: function (option) {
        option.path = option.path.replace('\/static', '');
        option.name = option.name.replace(/^\//, '');
        return option;
      }
    }),
    new erudaPlugin({
      enable: true // 发布代码前记得改回 false
    }),
    new HtmlWebpackPluginAlterAssetTags()
  ]
})

soloveHtmlPlugin(webpackConfig);

if (config.test.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.test.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.test.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
