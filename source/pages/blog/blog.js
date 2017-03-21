import 'reset-css/reset.css';
import './blog.scss';

const anchorLinks = require('Modules/anchorLinks');
const menu = require('Modules/menu');
const sideMenu = require('Modules/sideMenu');
const stickBlock = require('Modules/stickBlock');

require(`Js/common`);

$(() => {
    // Initialize anchor-links
    anchorLinks.init();

    // Initialize menu
    menu.init();

    // Initialize side menu
    sideMenu.init({
        navSelector: `.blog__nav`,
        pageSelector: `.page`
    });

    // Initialize stick blocks
    stickBlock.init($(`.stick-block`));
});
