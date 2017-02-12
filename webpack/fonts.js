module.exports = ({paths}) => {
    return {
        module: {
            rules: [
                {
                    test: /\.(woff2?|ttf|svg|eot)$/,
                    include: paths,
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[hash].[ext]',
                    },
                },
            ]
        }
    };
};
