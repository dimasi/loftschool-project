/** 
 * @module sideMenu
 * Mobile side menu
 * */
module.exports = (() => {
    let _$window = $(`html, body`),
        _$page,
        _$sideMenu,
        _$overlay = $(`<div class='side-menu__overlay'></div>`),
        _$sideMenuToggler = $(`<button type='button' class='side-menu__toggler'></button>`),

        /**
         * @param {object} params
         * @param {string} params.navSelector - Original nav selector
         * @param {string} params.pageSelector - Page content-wrapper selector
         */
        _createMenu = params => {
            _$page = $(params.pageSelector);
            _$page.addClass(`side-menu__page`);

            let _$cloneNav = $(params.navSelector).clone();
            _$sideMenu = $(`<div class='side-menu'></div>`)
                .html(_$cloneNav)
                .append(_$sideMenuToggler)
                .append(_$overlay);
            
            _$page.after(_$sideMenu);

            _$sideMenuToggler.on(`click touchend`, e => {
                e.preventDefault();
                _$page.addClass(`side-menu__page_state_side-menu-active`);
                _$sideMenu.addClass(`side-menu_state_active`);
                _$window.css({
                    overflow: `hidden`,
                    height: `auto`
                });
            });

            _$overlay.on(`click touchend`, e => {
                e.preventDefault();
                _$page.removeClass(`side-menu__page_state_side-menu-active`);
                _$sideMenu.removeClass(`side-menu_state_active`);
                _$window.css({
                    overflow: `visible`,
                    height: `100%`
                });
            });
        };

    return {
        init: params => _createMenu(params)
    };

})();
