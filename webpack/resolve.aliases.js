const path = require(`path`);

module.exports = () => {
    return {
        resolve: {
            alias: {
                Root: path.resolve($.PATHS.root),
                Js: path.resolve($.PATHS.source, `js/`),
                Modules: path.resolve($.PATHS.source, `js/modules/`),
                Images: path.resolve($.PATHS.source, `images/`),
                Video: path.resolve($.PATHS.source, `video/`),
                Scss: path.resolve($.PATHS.source, `scss/`),
                Fonts: path.resolve($.PATHS.source, `fonts/`)
            }
        }
    };
};
