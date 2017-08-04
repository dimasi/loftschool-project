import 'reset-css/reset.css';
import 'font-awesome/css/font-awesome.css';
import './index.scss';

import 'Root/node_modules/modernizr/bin/modernizr';
import preloader from 'Components/preloader/script';
import background from 'Components/background/script';
import panelWelcome from 'Components/panel-welcome/script';
import signInForm from 'Components/sign-in-form/script';

$(() => {
    preloader.init({
        waiting: true
    });

    background.init($('.background'));

    panelWelcome.init({
        $flipButton: $('.panel-welcome-toggler')
    });

    signInForm.init({
        $submitButton: $('.form-sign-in-submit')
    });
});
