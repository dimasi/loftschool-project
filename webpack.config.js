const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const pages = require('./webpack/pages');
const pug = require('./webpack/pug');
const sass = require('./webpack/sass');
const extractCSS = require('./webpack/css.extract');
const css = require('./webpack/css');
const uglifyJS = require('./webpack/js.uglify');
const devserver = require('./webpack/devserver');

const PATHS = {
  source: path.join(__dirname, 'source'),
  build: path.join(__dirname, 'build')
};

const common = merge([
  {
    entry: {},
    output: {
      path: PATHS.build,
      filename: './js/[name].js'
    },
    plugins: [
      new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
      })
    ],
  },
  pages({ 
    pathTo: `${PATHS.source}/pages`,
    aliases: [
      'index', 
      'about',
      'blog', 
      'portfolio', 
    ]
  }),
  pug()
]);


module.exports = (env) => {
    if (env === 'production') {
        return merge([
          common,
          extractCSS(),
          uglifyJS({ useSourceMap: true })
        ]);
    }
    if (env === 'development') {
        return merge([
            common,
            sass(),
            css(),
            devserver()
        ]);
    }
};
