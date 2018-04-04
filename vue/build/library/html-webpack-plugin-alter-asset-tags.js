// HtmlWebpackPluginAlterAssetTags.js

function HtmlWebpackPluginAlterAssetTags(options) {
  // Configure your plugin with options...
}

HtmlWebpackPluginAlterAssetTags.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-alter-asset-tags', function(tags, callback) {
      let search = /^\/static\/js\//,
        replace = 'http://local.static.zhizihua.com/';

      if (process.env.NODE_ENV == 'test') {
        search = /^\/static\//;
        replace = 'https://s2.dev.zhizihua.com/';
      }

      if (process.env.NODE_ENV == 'production') {
        search = /^\/static\//;
        replace = 'https://s2.zhizihua.com/';
      }

      for (let name in tags) {
        if (['head', 'body'].indexOf(name) == -1) {
          continue;
        }

        let position = tags[name];
        for(let index in position) {
          let tag = position[index].attributes;

          if (tag.href) {
            tag.href = tag.href.replace(search, replace);
          }
          if (tag.src) {
            tag.src = tag.src.replace(search, replace);
          }
        }
      }
      callback(null, tags);
    });
  });

};

module.exports = HtmlWebpackPluginAlterAssetTags;
