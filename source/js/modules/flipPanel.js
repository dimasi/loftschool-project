/** 
 * @module flipPanel
 * Flip
 * */
module.exports = (() => {
    let _$frontToggler,
        _$backToggler,
        _$flipPanel,
        _stateFlippedClassName = `flip-panel_state_flipped`;

    return {
        /**
         * @param {object} params
         * @param {string} params.frontTogglerSelector
         * @param {string} params.backTogglerSelector
         * @param {string} params.flipPanelSelector
         */
        init: params => {
            _$frontToggler = $(params.frontTogglerSelector);
            _$backToggler = $(params.backTogglerSelector);
            _$flipPanel = $(params.flipPanelSelector);

            _$frontToggler.one(`click`, () => {
                $(`.flip-panel__side_side_back`).css(`visibility`, `visible`);
            });

            _$frontToggler.on(`click`, () => {
                _$flipPanel.addClass(_stateFlippedClassName);
                _$frontToggler.hide();
            });

            _$backToggler.on(`click`, e => {
                e.preventDefault();
                _$flipPanel.removeClass(_stateFlippedClassName);
                _$frontToggler.fadeIn();
            });
        }
    };

})();
