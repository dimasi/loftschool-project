const autoprefixer = require('autoprefixer');

module.exports = () => {
    return autoprefixer({
        browsers: 'last 2 versions'
    })
}