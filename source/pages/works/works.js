import 'reset-css/reset.css';
import 'font-awesome/css/font-awesome.css';
import './works.scss';

import 'Root/node_modules/modernizr/bin/modernizr';
import preloader from 'Components/preloader/script';
import menu from 'Components/menu/script';
import videoBackground from 'Components/video-background/script';
import parallax from 'Components/parallax/script';
import comboSlider from 'Components/combo-slider/script';
import blur from 'Components/blur/script';
import anchorLinks from 'Components/anchor-link/script';
import contactForm from 'Components/contact-form/script';

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

    comboSlider.init($(`.combo-slider`));

    blur.init($(`.blur`));

    anchorLinks.init();

    contactForm.init({
        $el: $('.contact-form'),
        $submitButton: $('.contact-form-submit'),
        $resetButton: $('.contact-form-reset')
    });
});
