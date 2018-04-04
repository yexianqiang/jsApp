'use strict'
const utils = require('./utils')
const config = require('./config')
const isProduction = process.env.NODE_ENV !== 'develop'
const isOnline = ['test', 'production'].indexOf(process.env.NODE_ENV) > -1;

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isOnline
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
