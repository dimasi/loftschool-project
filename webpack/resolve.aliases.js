const path = require(`path`);

module.exports = () => {
    return {
        resolve: {
            alias: {
                Root: path.resolve($.PATHS.root),
                Layouts: path.resolve($.PATHS.source, `layouts/`),
                Components: path.resolve($.PATHS.source, `components/`),
                Images: path.resolve($.PATHS.source, `images/`),
                Video: path.resolve($.PATHS.source, `video/`),
                Scss: path.resolve($.PATHS.source, `scss/`),
                Fonts: path.resolve($.PATHS.source, `fonts/`)
            }
        }
    };
};
