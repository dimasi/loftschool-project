import 'reset-css/reset.css';
import 'font-awesome/css/font-awesome.css';
import './blog.scss';

import 'Root/node_modules/modernizr/bin/modernizr';
import preloader from 'Components/preloader/script';
import menu from 'Components/menu/script';
import videoBackground from 'Components/video-background/script';
import parallax from 'Components/parallax/script';
import anchorLinks from 'Components/anchor-link/script';
import sideMenu from 'Components/side-menu/script';
import stickBlock from 'Components/stick-block/script';

$(() => {
    preloader.init({
        waiting: true
    });

    menu.init();

    videoBackground.init($('.video-background'), {
        onRender: () => $(document).trigger('preloader:continue')
    });

    parallax.scroll([
        {
            selector: '.parallax__panel',
            divider: 0.05
        },
        {
            selector: '.parallax__stars',
            divider: 0.07
        },
        {
            selector: '.parallax__mountains',
            divider: 0.09
        }
    ]);

    sideMenu.init({
        navSelector: '.blog__nav .nav',
        pageSelector: '.layout-base'
    });

    stickBlock.init($('.blog__nav'));

    anchorLinks.init();
});
