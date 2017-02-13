module.exports = () => {
    return {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: { 
                        presets: [ 
                            [ 'es2015', { modules: false } ] 
                        ] 
                    }
                }
            ]
        }
    };
};
