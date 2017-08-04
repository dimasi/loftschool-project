/**
 * @module anchorLinks
 */
export default (() => {
    let _params = {
        duration: 1100
    };

    /**
     * Initialize
     * @param {object} params
     * @param {number} params.duration - Scroll animation duration
     */
    let init = params => {
        _params = Object.assign(_params, params);

        $(document).on('click', '.anchor-link', e => {
            e.preventDefault();
            let scrollTarget = $(e.currentTarget).attr('href');
            let destination = $(scrollTarget).offset().top;
            $('html, body').animate({ scrollTop: destination }, _params.duration);
        });
    };

    return {
        init: init
    };
})();
