import 'reset-css/reset.css';
import './about.scss';

const anchorLinks = require('Modules/anchorLinks');
const menu = require('Modules/menu');
const map = require('Modules/map');

require(`Js/common`);

$(() => {
    // Initialize anchor-links
    anchorLinks.init();

    // Initialize menu
    menu.init();

    // Initialize map
    map.init($(`.map__map`)[0]);

    // Temp: Indicators
    var $indicators = $(`.indicator`),
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
});
