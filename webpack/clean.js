var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = ({ paths, options }) => {
    return {
        plugins: [
            new CleanWebpackPlugin(paths, options)
        ]
    }
}