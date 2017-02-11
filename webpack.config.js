const path = require('path');
const merge = require('webpack-merge');
const pages = require('./webpack/pages');
const pug = require('./webpack/pug');
const sass = require('./webpack/sass');
const extractCSS = require('./webpack/css.extract');
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
          extractCSS()
        ]);
    }
    if (env === 'development') {
        return merge([
            common,
            sass(),
            devserver()
        ]);
    }
};
