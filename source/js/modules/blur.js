/** 
 * @module blur
 * */
module.exports = (() => {
    /**
     * @param {jQuery} $el
     */
    let _init = $el => {
        let blur = {
            $el: $el,
            wrapper: `.blur__panel-wrapper`,
            panel: `.blur__panel`,
            sectionBg: `.blur__img`
        };
        _setEventListeners(blur);
        _setPosition(blur);
    };

    /**
     * Set blur-panel background-position
     */
    let _setPosition = blur => {
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
    let _setEventListeners = blur => {
        $(window).on(`resize`, () => {
            _setPosition(blur);
        });
    };

    return {
        init: _init
    };
})();
