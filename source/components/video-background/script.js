/**
 * @module videoBackground
 * */
export default (() => {
    /**
     * Initialize
     * @param {jQuery}       $el
     * @param {object}       [params]
     * @param {function}     [params.onRender]
     */
    let init = ($el, params) => {
        /**
         * @namespace
         * @property {jQuery}        $el
         * @property {object}        params
         * @property {object}        data
         * @property {string}        data.image
         * @property {string}        data.video
         */
        let videoBackground = {
            $el: $el,
            params: params,
            data: {
                image: require('Components/video-background/images/sky.jpg'),
                video: require('Components/video-background/video/sky.mp4')
            }
        };

        if (!isMobileDevice()) {
            createVideoBackground(videoBackground);
        } else {
            createImageBackground(videoBackground);
        }
    };

    /**
     * Detect mobile device
     * @returns {boolean}
     */
    let isMobileDevice = () => {
        let isMobileDevice = false;
        let userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/windows phone/i.test(userAgent)) {
            isMobileDevice = true;
        }

        if (/android/i.test(userAgent)) {
            isMobileDevice = true;
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            isMobileDevice = true;
        }

        return isMobileDevice;
    };

    /**
     * Create image background
     * @param background
     */
    let createImageBackground = background => {
        let $image = $(`<img class="video-background__image" src="${background.data.image}" alt="">`);
        background.$el.html($image);
        background.params.onRender();
    };

    /**
     * Create video background
     * @param background
     */
    let createVideoBackground = background => {
        let $video = $(`<video>`, {
            attr: {
                src: background.data.video,
                class: 'video-background__video',
                autoplay: true,
                loop: true
            }
        });
        background.$el.html($video);
        background.params.onRender();
    };

    return {
        init: init
    };
})();
