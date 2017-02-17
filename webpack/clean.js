var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = () => {
    return {
        plugins: [
            new CleanWebpackPlugin([$.PATHS.build], {
                root: $.PATHS.root
            })
        ]
    }
}