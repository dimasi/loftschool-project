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
const copyVideo = require('./webpack/video.copy');
const favicon = require('./webpack/favicon');
const devserver = require('./webpack/devserver');
const clean = require('./webpack/clean');
const fonts = require('./webpack/fonts');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const modernizr = require('./webpack/modernizr');
const resolveAliases = require('./webpack/resolve.aliases');

const config = require('./config');

global.$ = {
    PATHS: {
        root: __dirname,
        source: path.join(__dirname, 'source'),
        build: path.join(__dirname, 'build')
    }
};


module.exports = (env = process.env.NODE_ENV) => {
    const common = merge([
        {
            entry: {}, // -> pages();
            output: {
                path: $.PATHS.build,
                publicPath: '/',
                filename: './js/[name].js'
            },
            plugins: [
                new BrowserSyncPlugin({
                    host: 'localhost',
                    port: 3000,
                    proxy: 'http://localhost:8080/'
                }, {
                    reload: false
                }),
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery',
                    Modernizr: 'modernizr'
                }),
                new webpack.NoEmitOnErrorsPlugin(),
                new webpack.DefinePlugin(
                    env === 'production' ? config.prod : config.dev
                )
            ]
        },
        
        pages([
            'index', 
            'about',
            'blog',
            `works`
        ]),
        pug(),
        lintJS(),
        babel(),
        lintCSS(),
        fonts(),
        copyImages(),
        copyVideo(),
        modernizr(),
        resolveAliases()
    ]);

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
