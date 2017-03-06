const path = require(`path`);

const modernizrOptions = {
    options: [
        `setClasses`
    ],
    'feature-detects': [
        `video/autoplay`,
        `touchevents`
    ]
};
 
module.exports = () => {
    return {
        module: {
            rules: [
                {
                    test: /modernizr$/,
                    loader: `webpack-modernizr-loader`,
                    options: modernizrOptions
                }
            ]
        },
        resolve: {
            alias: {
                modernizr$: path.resolve(__dirname, `./../.modernizrrc`)
            }
        }
    }
}
