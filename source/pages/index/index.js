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
let toggleFlipPanel = (() => {
    let i = 0;

    return () => {
        if (!i) {
            $('.flip-panel__side').first().css('display', 'none');
            $('.flip-panel__side').last().css('display', 'block');
            i++;
        } else {
            $('.flip-panel__side').first().css('display', 'block');
            $('.flip-panel__side').last().css('display', 'none');
            i--;
        }
    };
})();

$('#sign-in').on('click', () => toggleFlipPanel());
