import 'reset-css/reset.css';
import 'font-awesome/css/font-awesome.css';
import './admin.scss';

const preloader = require('Modules/preloader');

$(() => {
    // preloader
    preloader.init($(`.preloader`));
});
