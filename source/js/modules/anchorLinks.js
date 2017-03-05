/** 
 * @module anchorLinks
 * Flip
 * @todo Возможность передавать duration через data-атрибут
 * @todo Easing и возможность передачи функции в параметрах или через data-атрибут
 * */
module.exports = (() => {
    let _duration = 1100;

    return {
        /**
         * @param {object} params
         * @param {number} params.duration - Scroll animation duration
         */
        init: params => {
            if (params && params.duration) {
                _duration = params.duration;
            }

            $(`[data-toggle="anchor-link"]`).on(`click`, e => {
                e.preventDefault();
                let scrollTarget = $(e.currentTarget).attr(`data-target`);
                let destination = $(scrollTarget).offset().top;
                $(`html, body`).animate({ scrollTop: destination }, _duration);
            });
        }
    };

})();
