module.exports = (options) => {
    return {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: $.PATHS.source,
                    enforce: 'pre',
                    loader: 'eslint-loader',
                    options: options
                }
            ]
        }
    };
};
