/**
 * @module panelWelcome
 * Welcome page Flip Panel
 */
import flipPanel from 'Components/flip-panel/script';

export default (() => {
    /**
     * Initialize
     * @param params
     */
    let init = params => {
        /**
         * @namespace
         * @property {jQuery} $el
         */
        let panelWelcome = Object.assign({
            $el: $('.panel-welcome')
        }, params);

        flipPanel.init(panelWelcome.$el, {
            $frontToggler: panelWelcome.$flipButton
        });

        setEventListeners(panelWelcome);
    };

    /**
     * Set event listeners
     * @param panelWelcome
     */
    let setEventListeners = panelWelcome => {
        panelWelcome.$el.on('flip-panel:front-flip', () => {
            panelWelcome.$flipButton.addClass('flip-panel-toggler_hidden');
        });

        panelWelcome.$el.on('flip-panel:back-flip', () => {
            panelWelcome.$flipButton.removeClass('flip-panel-toggler_hidden');
        });
    };

    return {
        init: init
    };
})();
