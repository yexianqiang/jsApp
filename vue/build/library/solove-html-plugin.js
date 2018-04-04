
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (webpackConfig) {
  for (let name in webpackConfig.entry) {
    if (name == 'ensure-vendor') {
      continue;
    }

    let template = 'template.html';

    let entryDir = path.dirname(path.join(process.cwd(), webpackConfig.entry[name]));
    let templateFile = path.join(entryDir, 'template.html');

    try {
      let templateState = fs.statSync(templateFile);
      if (templateState.isFile()) {
        template = templateFile;
      }
    } catch (e) {}

    let config = {
      template,
      filename: path.resolve(__dirname, `../../dist/${name}.html`),
      inject: true,
      chunksSortMode: 'dependency',
      chunks: ['vendor', name],
    };
    if (name == 'subject-video') {
      config.template = 'subject/video/template.html';
    }

    webpackConfig.plugins.push(
      new HtmlWebpackPlugin(config)
    )
  }

  return webpackConfig;
}