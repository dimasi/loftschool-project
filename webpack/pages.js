const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getEntries(aliases) {
    let r = {};
    aliases.forEach((alias) => r[alias] = path.join($.PATHS.source, 'pages', alias, `${alias}.js`));
    return r;
}

function getPlugins(aliases) {
    return aliases.map((alias) => {
        return getPlugin(alias);
    });
}

function getPlugin(alias) {
    return new HtmlWebpackPlugin({
        chunks: [alias, 'common'],
        template: path.join($.PATHS.source, 'pages', alias, 'index.pug'),
        filename: `${alias}.html`
    });
}

module.exports = function(aliases) {
    return {
        entry: getEntries(aliases),
        plugins: [
            ...getPlugins(aliases),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common'
            })
        ]
    };
};
