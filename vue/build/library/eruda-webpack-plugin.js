/**
 * webpack plugin for eruda
 */
'use strict';

const path = require('path');
const fs = require('fs');

function erudaPlugin(options) {
  this.options = Object.assign({
    enable: false // 插件开关，默认“关”
  }, options);
}

erudaPlugin.prototype.apply = function(compiler) {
  const enable = this.options.enable;
  const pathVconsole = path.join(__dirname, '/eruda-init.js');

  compiler.plugin('entry-option', function() {
    if (enable) {
      if (Object.prototype.toString.call(this.options.entry) === '[object Array]') {
        this.options.entry.unshift(pathVconsole);
      } else if (typeof this.options.entry === 'object') {
        for (let key in this.options.entry) {
          if (Object.prototype.toString.call(this.options.entry[key]) === '[object Array]') {
            this.options.entry[key].unshift(pathVconsole);
          } else if (typeof this.options.entry[key] === 'string') {
            this.options.entry[key] = [pathVconsole, this.options.entry[key]];
          }
        }
      }

      // console.log(this.options.entry);
    }
  });
};

module.exports = erudaPlugin;