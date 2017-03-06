/** 
 * @module anchorLinks
 * Anchor links
 * @todo Возможность передавать duration через data-атрибут
 * @todo Easing и возможность передачи функции в параметрах или через data-атрибут
 * */
module.exports = (() => {
    let _params = {
        duration: 1100
    };

    /**
     * @param {object} params
     * @param {number} params.duration - Scroll animation duration
     */
    let _init = params => {
        _params = Object.assign(_params, params);

        $(document).on(`click`, `.anchor-link`, e => {
            e.preventDefault();
            let scrollTarget = $(e.currentTarget).attr(`href`);
            let destination = $(scrollTarget).offset().top;
            $(`html, body`).animate({ scrollTop: destination }, _params.duration);
        });
    };

    return {
        init: _init
    };

})();
