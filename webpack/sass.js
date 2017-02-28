const autoprefixer = require('./autoprefixer');

module.exports = () => {
    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer()
                                ]
                            }
                        },
                        'sass-loader'
                    ]
                }
            ]
        }
    };
};
