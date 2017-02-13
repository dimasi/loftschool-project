const SvgStorePlugin = require('external-svg-sprite-loader/lib/SvgStorePlugin');

module.exports = () => {
  return {
    module: {
      rules: [
        {
          test: /\.(jpg|png)$/,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        },
        {
            loader: 'external-svg-sprite-loader',
            test: /\.svg$/,
        }
      ]
    },
    plugins: [
        new SvgStorePlugin(),
    ]
  };
};