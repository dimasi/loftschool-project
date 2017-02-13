const IconPlugin = require('svg-sprite-webpack-plugin').plugin;
const iconPlugin = new IconPlugin('icons-[hash].svg');

module.exports = () => {
  return {
    module: {
      rules: [
        {
          test: /\.(jpg|png|svg)$/,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        },
        {
          test: /\.svg$/,
          loader: iconPlugin.extract()
        }
      ]
    },
    plugins: [
      iconPlugin,
    ]
  };
};