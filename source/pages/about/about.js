import 'reset-css/reset.css';
import 'font-awesome/css/font-awesome.css';
import './about.scss';

import 'Root/node_modules/modernizr/bin/modernizr';
import preloader from 'Components/preloader/script';
import menu from 'Components/menu/script';
import videoBackground from 'Components/video-background/script';
import parallax from 'Components/parallax/script';
import anchorLinks from 'Components/anchor-link/script';
import map from 'Components/map/script';

$(() => {
    preloader.init({
        waiting: true
    });

    menu.init();

    videoBackground.init($('.video-background'), {
        onRender: () => $(document).trigger(`preloader:continue`)
    });

    parallax.scroll([
        {
            selector: `.parallax__panel`,
            divider: 0.05
        },
        {
            selector: `.parallax__stars`,
            divider: 0.07
        },
        {
            selector: `.parallax__mountains`,
            divider: 0.09
        }
    ]);

    anchorLinks.init();

    // Temp: Indicators
    let $indicators = $(`.indicator`),
        len = $indicators.length,
        i = 0,
        interval;
    interval = setInterval(() => {
        let $indicator = $($indicators[i]);
        $indicator.find(`.indicator__progress`).css(`stroke-dasharray`, `${$indicator.data(`progress`)}  282.6`);
        i++;
        if (i == len) {
            clearInterval(interval);
        }
    }, 350);

    map.init($('.map')[0], {

    });
});
