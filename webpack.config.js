const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const pages = require('./webpack/pages');
const pug = require('./webpack/pug');
const sass = require('./webpack/sass');
const extractCSS = require('./webpack/css.extract');
const css = require('./webpack/css');
const uglifyJS = require('./webpack/js.uglify');
const lintJS = require('./webpack/js.lint');
const lintCSS = require('./webpack/sass.lint');
const images = require('./webpack/images');
const favicon = require('./webpack/favicon');
const devserver = require('./webpack/devserver');
const clean = require('./webpack/clean');
const fonts = require('./webpack/fonts');
const parts = require('./webpack/parts');

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
            }),
            new webpack.NoEmitOnErrorsPlugin()
        ]
    },
    pages({ 
        pathTo: `${PATHS.source}/pages`,
        aliases: [
            'index', 
            'about',
            'blog', 
            'portfolio' 
        ]
    }),
    pug(),
    lintJS({ paths: PATHS.sources }),
    lintCSS(),
    fonts({paths: `${PATHS.source}/fonts`}),
    images(),
    parts.loadFonts({
        options: {
        name: '[name].[ext]',
        },
    })
]);


module.exports = (env) => {
    if (env === 'production') {
        return merge([
            common,
            extractCSS(),
            uglifyJS({ useSourceMap: true }),
            favicon(),
            clean({ 
                paths: PATHS.build,
                options: {
                    root: __dirname
                }
            })
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
