const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  source: path.join(__dirname, 'source'),
  build: path.join(__dirname, 'build'),
  pages: path.join(__dirname, 'source/pages')
};

module.exports = {
  entry: {
    index: PATHS.pages + '/index/index.js',
    portfolio: PATHS.pages + '/portfolio/index.js',
    blog: PATHS.pages + '/blog/index.js',
    about: PATHS.pages + '/about/index.js'
  },
  output: {
    path: PATHS.build,
    filename: './js/[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['index'],
      template: PATHS.pages + '/index/index.pug',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['portfolio'],
      template: PATHS.pages + '/portfolio/index.pug',
      filename: 'portfolio.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['blog'],
      template: PATHS.pages + '/blog/index.pug',
      filename: 'blog.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['about'],
      template: PATHS.pages + '/about/index.pug',
      filename: 'about.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader', 
        options: {
          pretty: true
        }
      }
    ]
  }
};
