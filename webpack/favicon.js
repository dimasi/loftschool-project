const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = () => {
  return {
    plugins: [
      new FaviconsWebpackPlugin({
        logo: './source/favicon.png'
      })
    ]
  };
};
