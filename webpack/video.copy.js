module.exports = () => {
  return {
    module: {
      rules: [
        {
          test: /\.mp4$/,
          loader: 'file-loader',
          options: {
            name: 'videos/[name].[ext]'
          }
        }
      ]
    }
  };
};
