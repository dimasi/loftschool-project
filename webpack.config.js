const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const pages = require('./webpack/pages');
const pug = require('./webpack/pug');
const sass = require('./webpack/sass');
const extractCSS = require('./webpack/css.extract');
const css = require('./webpack/css');
const babel = require('./webpack/babel');
const uglifyJS = require('./webpack/js.uglify');
const lintJS = require('./webpack/js.lint');
const lintCSS = require('./webpack/sass.lint');
const copyImages = require('./webpack/images.copy');
const favicon = require('./webpack/favicon');
const devserver = require('./webpack/devserver');
const clean = require('./webpack/clean');
const fonts = require('./webpack/fonts');

global.$ = {
    PATHS: {
        root: __dirname,
        source: path.join(__dirname, 'source'),
        build: path.join(__dirname, 'build')
    }
}

const common = merge([
    {
        entry: {}, // -> pages();
        output: {
            path: $.PATHS.build,
            publicPath: '/',
            filename: './js/[name].js'
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            }),
            new webpack.NoEmitOnErrorsPlugin()
        ]
    },
    
    pages([
        'test-build',
        'index', 
        'about',
        'blog', 
        'portfolio'
    ]),
    pug(),
    lintJS(),
    babel(),
    lintCSS(),
    fonts(),
    copyImages()
]);


module.exports = (env) => {
    if (env === 'production') {
        return merge([
            common,
            extractCSS(),
            uglifyJS({
                useSourceMap: true
            }),
            favicon(),
            clean()
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
