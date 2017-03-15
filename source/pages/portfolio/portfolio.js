import 'reset-css/reset.css';
import './../../scss/base.scss';

import 'font-awesome/css/font-awesome.css';

import './../../scss/blocks/preloader.scss';
import './../../scss/blocks/text.scss';
import './../../scss/blocks/btn.scss';
import './../../scss/blocks/btn-arrow.scss';
import './../../scss/blocks/textfield.scss';
import './../../scss/blocks/textarea.scss';
import './../../scss/blocks/formfield.scss';
import './../../scss/blocks/form-message.scss';
import './../../scss/blocks/heading.scss';
import './../../scss/blocks/avatar.scss';
import './../../scss/blocks/hamburger.scss';
import './../../scss/blocks/social.scss';
import './../../scss/blocks/nav.scss';
import './../../scss/blocks/copyright.scss';
import './../../scss/blocks/menu.scss';

import './../../scss/blocks/page.scss';
import './../../scss/blocks/footer.scss';
import './../../scss/blocks/page-header.scss';
import './../../scss/blocks/ribbon.scss';
import './../../scss/blocks/user.scss';
import './../../scss/blocks/page-works.scss';
import './../../scss/blocks/combo-slider.scss';
import './../../scss/blocks/carousel.scss';
import './../../scss/blocks/text-fx.scss';
import './../../scss/blocks/work-features.scss';
import './../../scss/blocks/quotes.scss';
import './../../scss/blocks/quote.scss';
import './../../scss/blocks/form.scss';
import './../../scss/blocks/blur.scss';

const anchorLinks = require('Modules/anchorLinks');
const menu = require('Modules/menu');
const comboSlider = require('Modules/comboSlider');
const forms = require('Modules/forms');
const blur = require('Modules/blur');

require(`Js/common`);

// Initialize anchor-links
anchorLinks.init();

// Initialize menu
menu.init();

// Initialize portfolio slider
comboSlider.init($(`.combo-slider`));

// Forms validate
forms.init();

// Initialize blur
blur.init($(`.blur`));
