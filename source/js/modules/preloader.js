const lodashUniq = require('lodash/uniq');

/** 
 * @module preloader
 * Preloader
 * */
module.exports = (() => {
    let _params = {
        waiting: false,
        $context: $(document)
    };

    /**
     * Supported formats
     */
    let _extensions = {
        images: [`jpg`, `png`, `gif`],
        videos: [`mp4`, `ogg`, `webm`]
    };

    /**
     * @param {object} $el
     * @param {object} params
     * @param {number} params.waiting - When passing a parameter, the script will wait for the 
     * event "preloader:continue" on the document object before start preloading media.
     */
    let _init = ($el, params) => {
        $(`html, body`).css(`overflow`, `hidden`);
        let preloader = Object.assign(_params, params);
        preloader.$el = $el;
        preloader.$percents = $el.find(`.preloader__percents`);
        preloader.$spinner = $el.find(`.preloader__spinner`);
        if (preloader.waiting) {
            preloader.$context.one(`preloader:continue`, () =>_loading(preloader));
        } else {
            _loading(preloader);
        }
    };

    /**
     * Get media sources
     * @param {object} preloader
     * @returns {array} Array with paths
     */
    let _getPaths = preloader => {
        let paths = preloader.$context.find(`*`).map((index, element) => {
            let background = $(element).css(`background-image`);
            let path = ``;
            let isImg = $(element).is(`img`);
            let isVideo = $(element).is(`video`);

            if (background != `none`) {
                path = background.replace(`url("`, ``).replace(`")`, ``);
            }

            if (isImg || isVideo) {
                path = $(element).attr(`src`);
            }

            if (path && path.indexOf(`data:`) != 0) return path;
        });

        return lodashUniq(paths);
    };

    /**
     * Preloading media
     * @param {object} preloader
     */
    let _loading = (preloader) => {
        preloader.$spinner.fadeIn();
        preloader.paths = _getPaths(preloader);
        preloader.current = 0;
        preloader.total = preloader.paths.length;

        if (!preloader.paths.length && !preloader.waiting) {
            _unsetPreloader(preloader);
        }

        preloader.paths.forEach(path => {
            let pathExtension = path.substring(path.lastIndexOf(`.`) + 1);
            let isVideo = _extensions.videos.indexOf(pathExtension) != -1;
            let isImg = _extensions.images.indexOf(pathExtension) != -1;

            if (isVideo || isImg) {
                let fakeElement;

                if (isVideo) {
                    fakeElement = $(`video`)[0];
                    var req = new XMLHttpRequest();
                    req.open(`GET`, path, true);
                    req.responseType = `blob`;
                    req.onload = function() {
                        if (this.status === 200) {
                            preloader.current++;
                            _setPercents(preloader);
                        }
                    };
                    req.send();
                }

                if (isImg) {
                    fakeElement = $(`<img>`);
                    fakeElement.on(`load`, () => {
                        preloader.current++;
                        _setPercents(preloader);
                    });
                    fakeElement.attr(`src`, path);
                }
            } else {
                preloader.total--;
            }
        });
    };

    /**
     * Update indicator percents
     * @param {object} preloader
     */
    let _setPercents = preloader => {
        let _percents = Math.ceil(preloader.current / preloader.total * 100);
        preloader.$percents.text(`${_percents}%`);

        if (_percents == 100) {
            _unsetPreloader(preloader);
        }
    };

    /**
     * Hide preloader
     * @param {object} preloader
     */
    let _unsetPreloader = preloader => {
        preloader.$el.fadeOut();
        $(`html, body`).css(`overflow`, `visible`);
    };

    return {
        init: _init
    };
})();
