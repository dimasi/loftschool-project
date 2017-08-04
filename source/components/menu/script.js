/**
 * @module menu
 */
module.exports = (() => {
    let $menu,
        $toggler,
        active = false,
        $page = $('body, html');

    /**
     * Initialize menu
     */
    let init = () => {
        $menu = $('.menu');
        $toggler = $('.menu-toggler.hamburger');

        $toggler.on('click', e => {
            e.preventDefault();
            if (active) {
                $page.css('overflow', 'visible');
                $menu.removeClass('menu_state_active');
                $toggler.removeClass('hamburger_state_cross');
                active = false;
            } else {
                $page.css('overflow', 'hidden');
                $menu.addClass('menu_state_active');
                $toggler.addClass('hamburger_state_cross');
                active = true;
            }
        });
    };

    return {
        init: init
    };
})();
