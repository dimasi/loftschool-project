/** 
 * Mobile side menu
 * @module sideMenu
 * */
module.exports = (() => {
    let _$window = $(`html, body`);
    let _$overlay = $(`<div class='side-menu__overlay'></div>`);
    let _$sideMenuToggler = $(`<button type='button' class='side-menu__toggler'></button>`);

    let _$page, _$sideMenu, _$originalMenu, _$abstractMenu;

    /**
     * Initialize and render menu
     * @param {object} params
     * @param {string} params.navSelector - Original nav selector
     * @param {string} params.pageSelector - Page content-wrapper selector
     */
    let _createMenu = params => {
        _$page = $(params.pageSelector);
        _$page.addClass(`side-menu__page`);
        _$originalMenu = $(params.navSelector);

        let _$cloneNav = _$originalMenu.clone();

        _$abstractMenu = _$originalMenu.add(_$cloneNav);

        _$sideMenu = $(`<div class='side-menu'></div>`)
            .html(_$cloneNav)
            .append(_$sideMenuToggler)
            .append(_$overlay);

        _$page.after(_$sideMenu);
        
        _$sideMenu.find(`.stick-block`).removeClass(`stick-block`);
        
        _setEventListeners();
        _checkCurrentSection();
    };

    /** Open menu */
    let _openMenu = () => {
        _$page.addClass(`side-menu__page_state_side-menu-active`);
        _$window.addClass(`side-menu__window_state_side-menu-active`);
        _$sideMenu.addClass(`side-menu_state_active`);
    };

    /** Close menu */
    let _closeMenu = () => {
        _$page.one(`transitionend`, () => {
            _$window.removeClass(`side-menu__window_state_side-menu-active`);
        });
        _$page.removeClass(`side-menu__page_state_side-menu-active`);
        _$sideMenu.removeClass(`side-menu_state_active`);
    };

    /** Set DOM event listeners */
    let _setEventListeners = () => {
        $(document).on(`scroll`, _checkCurrentSection);

        _$sideMenuToggler.on(`click touchend`, e => {
            e.preventDefault();
            _openMenu();
        });

        _$overlay.on(`click touchend`, e => {
            e.preventDefault();
            _closeMenu();
        });
    };

    /** Set active nav element by page scroll */
    let _checkCurrentSection = () => {
        _$abstractMenu.find(`.nav__link`).each((index, item) => {
            let $section = $($(item).attr(`href`));
            let sectionPosition = $section.offset().top;
            let scrollPosition = $(window).scrollTop();
            
            if (sectionPosition <= scrollPosition && sectionPosition + $section.outerHeight() > scrollPosition) {
                $(item).closest(`nav`).find(`.nav__item`).removeClass(`nav__item_state_active`);
                $(item).closest(`.nav__item`).addClass(`nav__item_state_active`);
            }
        });
    };

    return {
        init: _createMenu
    };
})();
