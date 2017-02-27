// CSS
import 'reset-css/reset.css';
import './../../scss/base.scss';

import 'font-awesome/css/font-awesome.css';

import './../../scss/blocks/text.scss';
import './../../scss/blocks/btn.scss';
import './../../scss/blocks/heading.scss';
import './../../scss/blocks/avatar.scss';
import './../../scss/blocks/social.scss';
import './../../scss/blocks/nav.scss';
import './../../scss/blocks/textfield.scss';
import './../../scss/blocks/checkbox.scss';
import './../../scss/blocks/radio.scss';
import './../../scss/blocks/copyright.scss';
import './../../scss/blocks/radio-group.scss';

import './../../scss/blocks/page-welcome.scss';
import './../../scss/blocks/flip-panel.scss';
import './../../scss/blocks/user.scss';
import './../../scss/blocks/login.scss';
import './../../scss/blocks/form-guard.scss';

// JS
let $flipPanel = $('.flip-panel');

$('#sign-in').one('click', () => {
    $('.flip-panel__side_side_back').css('visibility', 'visible');
});

$('#sign-in').on('click', () => {
    $flipPanel.addClass('flip-panel_state_flipped');
});

$('[href="#welcome-backflip"]').on('click', e => {
    e.preventDefault();
    $flipPanel.removeClass('flip-panel_state_flipped');
});
