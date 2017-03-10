const clientFeatureDetector = require(`Modules/clientFeatureDetector`);

/** 
 * @module mediaBackground
 * The module creates animated background
 * @requires module:createElement
 * */
module.exports = (() => {
    /**
     * @param {object} params
     * @param {string} params.layerHolder - The selector holder future media layer, which will be replaced by an animated gif or video
     * @param {string} params.videoSrc - Video source
     * @param {string} params.gifSrc - .gif-fallback source
     * @param {string} params.className - Class name for created media element
     */
    let _createMediaBackground = params => {
        let _$el;

        clientFeatureDetector.touchevents().then(supported => {
            if (!supported) {
                _$el = $(`<video>`, {
                    attr: {
                        src: require(`Video/${params.videoSrc}`),
                        class: params.className,
                        autoplay: true,
                        loop: true
                    }
                });
            } else {
                _$el = $(`<img>`, {
                    attr: {
                        src: require(`Images/${params.gifSrc}`),
                        class: params.className
                    }
                });
            }

            $(params.layerHolder).replaceWith(_$el);
        });
    };

    return {
        init: _createMediaBackground
    };
})();
