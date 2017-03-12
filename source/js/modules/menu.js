/** 
 * @module menu
 * Menu
 * */
module.exports = (() => {
    let _$menu,
        _$toggler,
        _active = false,
        _$page = $(`body, html`);

    /** Initialize menu */
    let _init = () => {
        _$menu = $(`.menu`);
        _$toggler = $(`.hamburger`);

        _$toggler.on('click', e => {
            e.preventDefault();
            if (_active) {
                _$page.css(`overflow`, `visible`);
                _$menu.removeClass(`menu_state_active`);
                _$toggler.removeClass(`hamburger_state_cross`);
                _active = false;
            } else {
                _$page.css(`overflow`, `hidden`);
                _$menu.addClass(`menu_state_active`);
                _$toggler.addClass(`hamburger_state_cross`);
                _active = true;
            }
        });
    }

    return {
        init: _init
    };
})();
