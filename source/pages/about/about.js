// CSS
import 'reset-css/reset.css';
import './../../scss/base.scss';

import './../../scss/blocks/text.scss';
import './../../scss/blocks/btn-arrow.scss';
import './../../scss/blocks/heading.scss';
import './../../scss/blocks/img.scss';
import './../../scss/blocks/avatar.scss';
import './../../scss/blocks/hamburger.scss';
import './../../scss/blocks/social.scss';
import './../../scss/blocks/nav.scss';
import './../../scss/blocks/copyright.scss';

import './../../scss/blocks/page.scss';
import './../../scss/blocks/footer.scss';
import './../../scss/blocks/page-header.scss';
import './../../scss/blocks/section.scss';
import './../../scss/blocks/ribbon.scss';
import './../../scss/blocks/about.scss';
import './../../scss/blocks/user.scss';
import './../../scss/blocks/indicator.scss';
import './../../scss/blocks/indicators-grid.scss';
import './../../scss/blocks/map.scss';

// JS
// Temp: Indicators
$(() => {
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
