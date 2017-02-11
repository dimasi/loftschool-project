const webpack = require('webpack');

module.exports = (useSourceMap) => {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: useSourceMap,
                compress: {
                    warnings: false
                }
            })
        ]
    };
};
