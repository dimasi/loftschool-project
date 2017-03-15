const path = require('path');

module.exports = () => {
  return {
    module: {
      rules: [
        {
          test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          exclude: [
            path.join($.PATHS.source, 'images'), 
            path.join($.PATHS.source, 'components')
          ],
          use: {
            loader: 'file-loader',
            options: {
                name: 'fonts/[name].[ext]',
            }
          }
        }
      ],
    },
  };
};
