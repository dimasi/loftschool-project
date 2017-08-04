/**
 * @module flipPanel
 */
export default (() => {
    /**
     * Initialize
     * @param $el
     * @param params
     */
    let init = ($el, params) => {
        $el.each((index, el) => {
            let flipper = Object.assign({
                $el: $(el),
                $frontToggler: $(el).find('.flip-panel__front-toggler'),
                $backToggler: $(el).find('.flip-panel__back-toggler'),
                flippedClassName: 'flip-panel_state_flipped'
            }, params);

            setEventListeners(flipper);
        });
    };

    /**
     * Set event listeners
     * @param flipper
     */
    let setEventListeners = flipper => {
        flipper.$frontToggler.on('click', () => {
            frontFlip(flipper);
        });

        flipper.$backToggler.on('click', () => {
            backFlip(flipper);
        });
    };

    /**
     * Flip panel
     * @param flipper
     */
    let frontFlip = flipper => {
        flipper.$el.addClass(flipper.flippedClassName).trigger('flip-panel:front-flip');
    };

    /**
     * Flip back panel
     * @param flipper
     */
    let backFlip = flipper => {
        flipper.$el.removeClass(flipper.flippedClassName).trigger('flip-panel:back-flip');
    };

    return {
        init: init
    };
})();
