const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getEntries(pathTo, aliases) {
    let r = {};
    aliases.forEach((alias) => r[alias] = `${pathTo}/${alias}/${alias}.js`);
    return r;
}

function getPlugins(pathTo, aliases) {
    return aliases.map((alias) => {
        return getPlugin(pathTo, alias);
    })
}

function getPlugin(pathTo, alias) {
    return new HtmlWebpackPlugin({
        chunks: [alias, 'common'],
        template: `${pathTo}/${alias}/index.pug`,
        filename: `${alias}.html`
    })
}

module.exports = function({pathTo, aliases}) {
    return {
        entry: getEntries(pathTo, aliases),
        plugins: [
            ...getPlugins(pathTo, aliases),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
            })
        ]
    };
};