const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('./autoprefixer');

module.exports = () => {
    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        publicPath: '../',
                        fallback: 'style-loader',
                        use: [
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
                    })
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader']
                    })
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('./css/[name].css')
        ]
    };
};
