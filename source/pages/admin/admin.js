import 'reset-css/reset.css';
import './../../scss/base.scss';

import 'font-awesome/css/font-awesome.css';

import './../../scss/blocks/preloader.scss';
import './../../scss/blocks/text.scss';
import './../../scss/blocks/link.scss';
import './../../scss/blocks/btn.scss';
import './../../scss/blocks/heading.scss';
import './../../scss/blocks/nav.scss';
import './../../scss/blocks/textfield.scss';
import './../../scss/blocks/formfield.scss';
import './../../scss/blocks/form-message.scss';
import './../../scss/blocks/form.scss';

import './../../scss/blocks/page-admin.scss';
import './../../scss/blocks/tabs.scss';
import './../../scss/blocks/grid-layout.scss';

const preloader = require('Modules/preloader');

$(() => {
    // preloader
    preloader.init($(`.preloader`));
});
