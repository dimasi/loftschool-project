const clientFeatureDetector = require(`Modules/clientFeatureDetector`);
const createElement = require(`Modules/createElement`);

/** 
 * @module mediaBackground
 * The module creates animated background
 * @requires module:createElement
 * */
module.exports = (() => {
    let _el;

    return {
        /**
         * @param {object} params
         * @param {string} params.layerHolder - The selector holder future media layer, which will be replaced by an animated gif or video
         * @param {string} params.videoSrc - Video source
         * @param {string} params.gifSrc - .gif-fallback source
         * @param {string} params.className - Class name for created media element
         */
        init: params => {
            clientFeatureDetector.touchevents().then(supported => {
                if (!supported) {
                    _el = createElement.video({
                        src: require(`Video/${params.videoSrc}`),
                        className: params.className,
                        data: {
                            autoplay: true,
                            loop: true
                        }
                    });

                } else {
                    _el = createElement.image({
                        src: require(`Images/${params.gifSrc}`),
                        className: params.className
                    });

                }

                $(params.layerHolder).replaceWith($(_el));
            });
        }
    };

})();
