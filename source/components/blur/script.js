/**
 * @module blur
 */
export default (() => {
    /**
     * Initialize
     * @param {jQuery} $el
     */
    let init = $el => {
        let blur = {
            $el: $el,
            wrapper: '.blur__panel-wrapper',
            panel: '.blur__panel',
            sectionBg: '.blur__img'
        };
        setEventListeners(blur);
        setPosition(blur);
    };

    /**
     * Set blur-panel background-position
     */
    let setPosition = blur => {
        let $sectionBg = blur.$el.find(blur.sectionBg);
        let $wrapper = blur.$el.find(blur.wrapper);
        let bgWidth = $sectionBg.outerWidth();
        let imgOffset  = $sectionBg.offset();
        let posX = imgOffset.left - $(window).width() / 2 + $wrapper.width() / 2;
        let posY = imgOffset.top - $wrapper.offset().top;

        $(blur.panel).css({
            backgroundSize: `${bgWidth}px`,
            backgroundPosition: `${posX}px ${posY}px`
        });
    };

    /**
     * Set document event listeners
     */
    let setEventListeners = blur => {
        $(window).on('resize', () => {
            setPosition(blur);
        });
    };

    return {
        init: init
    };
})();
