import 'reset-css/reset.css';
import 'font-awesome/css/font-awesome.css';
import './portfolio.scss';

const anchorLinks = require('Modules/anchorLinks');
const menu = require('Modules/menu');
const comboSlider = require('Modules/comboSlider');
const forms = require('Modules/forms');
const blur = require('Modules/blur');

require(`Js/common`);

$(() => {
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
});
