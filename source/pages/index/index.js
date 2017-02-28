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

// Parallax
let parallaxRule = (e, divider) => {
    let bottomPosition = (window.innerHeight / 2) * divider,
        pageX = e.pageX,
        pageY = e.pageY,
        initialX = (window.innerWidth / 2) - pageX,
        initialY = (window.innerHeight / 2) - pageY,
        positionX = initialX * divider,
        positionY = initialY * divider;

    return {
        'transform': `translate3d(${positionX}px, ${positionY}px, 0)`,
        '-webkit-transform': `translate3d(${positionX}px, ${positionY}px, 0)`,
        'bottom': `-${bottomPosition}px`
    };
};

$(window).on('mousemove', e => {
    let $layer = $flipPanel,
        $layer2 = $('.page-welcome__bg');

    $layer.css(parallaxRule(e, 0.01));
    $layer2.css(parallaxRule(e, 0.008));
});
