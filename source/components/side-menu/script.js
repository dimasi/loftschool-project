/**
 * @module sideMenu
 */
export default (()=> {
    let $window = $('html, body');
    let $overlay = $('<div class="side-menu__overlay"></div>');
    let $sideMenuToggler = $('<button type="button" class="side-menu__toggler"></button>');
    let $page, $sideMenu, $originalMenu, $abstractMenu;

    /**
     * Initialize and render menu
     * @param {object} params
     * @param {string} params.navSelector
     * @param {string} params.pageSelector
     */
    let createMenu = params => {
        $page = $(params.pageSelector);
        $page.addClass('side-menu__page');
        $originalMenu = $(params.navSelector);

        let $cloneNav = $originalMenu.clone();
        $abstractMenu = $originalMenu.add($cloneNav);
        $sideMenu = $('<div class="side-menu"></div>')
            .html($cloneNav)
            .append($sideMenuToggler)
            .append($overlay);
        $page.after($sideMenu);

        setEventListeners();
        checkCurrentSection();
    };

    /**
     * Open menu
     */
    let openMenu = () => {
        $page.addClass('side-menu__page_state_side-menu-active');
        $window.addClass('side-menu__window_state_side-menu-active');
        $sideMenu.addClass('side-menu_state_active');
    };

    /**
     * Close menu
     */
    let closeMenu = () => {
        $page.one('transitionend', () => {
            $window.removeClass('side-menu__window_state_side-menu-active');
        });
        $page.removeClass('side-menu__page_state_side-menu-active');
        $sideMenu.removeClass('side-menu_state_active');
    };

    /**
     * Set event listeners
     */
    let setEventListeners = () => {
        $(document).on('scroll', checkCurrentSection);

        $sideMenuToggler.on('click touchend', e => {
            e.preventDefault();
            openMenu();
        });

        $overlay.on('click touchend', e => {
            e.preventDefault();
            closeMenu();
        });
    };

    /**
     * Set active nav element by page scroll
     */
    let checkCurrentSection = () => {
        $abstractMenu.find('.nav__link').each((index, item) => {
            let $section = $($(item).attr('href'));
            let sectionPosition = $section.offset().top;
            let scrollPosition = $(window).scrollTop();

            if (sectionPosition <= scrollPosition && sectionPosition + $section.outerHeight() > scrollPosition) {
                $(item).closest('nav').find('.nav__item').removeClass('nav__item_state_active');
                $(item).closest('.nav__item').addClass('nav__item_state_active');
            }
        });
    };

    return {
        init: createMenu
    };
})();
