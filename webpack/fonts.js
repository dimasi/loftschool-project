module.exports = ({ include, exclude, options } = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.(woff2?|ttf)(\?v=\d+\.\d+\.\d+)?$/,
          use: {
            loader: 'file-loader',
            options: {
                name: 'fonts/[name].[ext]',
            }
          },
        },
      ],
    },
  };
};