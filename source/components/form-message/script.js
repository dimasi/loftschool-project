/**
 * @module formMessage
 */
export default (() => {
    /**
     * Show form message
     * @param $el
     * @param params
     */
    let show = ($el, params) => {
        $el.find('.form-message__text').text(params.text).end().addClass('form-message_active');
        $el.find('.form-message__close').one('click', e => {
            $(e.target).closest('.form-message').removeClass('form-message_active');
        });
    };

    return {
        show: show
    };
})();
