import 'reset-css/reset.css';
import 'font-awesome/css/font-awesome.css';
import './admin.scss';

require(`Root/node_modules/modernizr/bin/modernizr`);

const preloader = require('Modules/preloader');
const tabs = require('Modules/tabs');

$(() => {
    // preloader
    preloader.init($(`.preloader`));

    // tabs
    tabs.init({
        navLinkSelector: `.tabs__nav .nav__link`,
        tabSelector: `.tabs__tab`,
        navLinkActiveClass: `nav__link_state_active`
    });
});
