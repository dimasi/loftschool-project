import 'reset-css/reset.css';
import 'font-awesome/css/font-awesome.css';
import './index.scss';

const preloader = require('Modules/preloader');
const clientFeatureDetector = require(`Modules/clientFeatureDetector`);
const mediaBackground = require('Modules/mediaBackground');
const parallax = require('Modules/parallax');
const flipPanel = require('Modules/flipPanel');
const forms = require('Modules/forms');

$(() => {
    // preloader
    preloader.init($(`.preloader`), {
        waiting: true
    });

    // Create animated background
    mediaBackground.init({
        layerHolder: `.page-welcome__bg-media-holder`,
        videoSrc: `media-background.mp4`,
        gifSrc: `media-background.gif`,
        className: `page-welcome__bg-media`,
        onRender: () => $(document).trigger(`preloader:continue`)
    });

    // Create parallax
    clientFeatureDetector.touchevents().then(touchDevice => {
        if (!touchDevice) {
            parallax.mousemove([
                {
                    selector: `.flip-panel`,
                    divider: 0
                },
                {
                    selector: '.page-welcome__bg',
                    divider: 0.01
                }
            ]);
        }
    });

    // Init flip-panel
    flipPanel.init({
        frontTogglerSelector: `.flip-panel__front-toggler`,
        backTogglerSelector: `.flip-panel__back-toggler`,
        flipPanelSelector: `.flip-panel`
    });

    // Forms validate
    forms.init();
});
