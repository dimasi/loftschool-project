// CSS
import 'reset-css/reset.css';
import './../../scss/base.scss';

import 'font-awesome/css/font-awesome.css';

import './../../scss/blocks/text.scss';
import './../../scss/blocks/btn.scss';
import './../../scss/blocks/btn-arrow.scss';
import './../../scss/blocks/textfield.scss';
import './../../scss/blocks/textarea.scss';
import './../../scss/blocks/heading.scss';
import './../../scss/blocks/avatar.scss';
import './../../scss/blocks/hamburger.scss';
import './../../scss/blocks/social.scss';
import './../../scss/blocks/nav.scss';
import './../../scss/blocks/copyright.scss';

import './../../scss/blocks/page.scss';
import './../../scss/blocks/footer.scss';
import './../../scss/blocks/page-header.scss';
import './../../scss/blocks/ribbon.scss';
import './../../scss/blocks/user.scss';
import './../../scss/blocks/page-works.scss';
import './../../scss/blocks/slider-works.scss';
import './../../scss/blocks/work-features.scss';
import './../../scss/blocks/quotes.scss';
import './../../scss/blocks/quote.scss';
import './../../scss/blocks/form.scss';


// JS
// const clientFeatureDetector = require(`Modules/clientFeatureDetector`);
const mediaBackground = require('Modules/mediaBackground');
const parallax = require('Modules/parallax');

// Create animated background
mediaBackground.init({
    layerHolder: `.page-header__bg-video`,
    videoSrc: `media-background.mp4`,
    gifSrc: `media-background.gif`,
    className: `page-header__bg-video`
});

// Create parallax
parallax.scroll([
    {
        selector: `.page-header__user`,
        divider: 0.05
    },
    {
        selector: `.page-header__bg-user`,
        divider: 0.07
    },
    {
        selector: '.page-header__bg',
        divider: 0.09
    }
]);
