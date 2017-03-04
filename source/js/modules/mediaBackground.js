require(`Root/node_modules/modernizr/bin/modernizr`);
const createElement = require(`Modules/createElement`);

/** 
 * @module mediaBackground
 * @requires Modernizr (videoautoplay)
 * @requires module:createElement
 * */
module.exports = (() => {
    let _el,
        _detectVideoAutoplaySupport = new Promise(resolve => global.Modernizr.on(`videoautoplay`, result => resolve(result)));

    return {
        /**
         * @param {object} params
         * @param {string} params.layerHolder - The selector holder future media layer, which will be replaced by an animated gif or video
         * @param {string} params.videoSrc - Video source
         * @param {string} params.gifSrc - .gif-fallback source
         * @param {string} params.className - Class name for created media element
         */
        init: params => {
            _detectVideoAutoplaySupport.then(supported => {
                if (supported) {
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
