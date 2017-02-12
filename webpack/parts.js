exports.loadFonts = function({ include, exclude, options } = {}) {
  return {
    module: {
      rules: [
        {
          // Capture eot, ttf, svg, woff, and woff2
          test: /\.(woff2?|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
          include,
          exclude,

          use: {
            loader: 'file-loader',
            options,
          },
        },
      ],
    },
  };
};