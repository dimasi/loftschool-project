/** 
 * The module includes a set of methods to create HTML elements
 * @module createElement
 * */
module.exports = (() => {
    /**
     * Add attributes to the tag
     * @param {HTMLElement} el
     * @param {object} attrs
     * @returns {HTMLElement} Element with attributes
     */
    let _mergeWithAttributes = (el, attrs) => {
        for (let attr in attrs) {
            if (attrs[attr]) {
                el[attr] = attrs[attr];
            }
        }

        return el;
    };

    /**
     * Create the video tag
     * @param {string} params.src - Path to source
     * @param {string} [params.className=null] - Extra class for element
     * @param {object} [params.data] - @link https://www.w3schools.com/tags/tag_video.asp
     * @returns {HTMLElement}
     */
    let _createVideo = params => {
        if (!params.src) {
            console.log(`src is required!`);
            return false;
        }

        let el = document.createElement(`video`);
        let attrs = Object.assign({
            src: params.src,
            className: params.className || null,
            autoplay: false,
            controls: false,
            width: null,
            height: null,
            loop: false,
            poster: null
        }, params.data);

        return _mergeWithAttributes(el, attrs);
    };

    /**
     * Create the image tag
     * @param {string} params.src - Path to source
     * @param {string} [params.className=null] - Extra class for element
     * @param {object} [params.data] - @link https://www.w3schools.com/html/html_images.asp
     * @returns {HTMLElement}
     */
    let _createImage = params => {
        if (!params.src) {
            console.log(`src is required!`);
            return false;
        }

        let el = new Image();
        let attrs = Object.assign({
            src: params.src,
            className: params.className || null,
            alt: ``
        }, params.data);

        return _mergeWithAttributes(el, attrs);
    };

    return {
        video: _createVideo,
        image: _createImage
    };
})();
