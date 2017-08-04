/**
 * @module signInForm
 */
import formMessage from 'Components/form-message/script';

export default (()=> {
    let $signInForm =  $('.sign-in-form');

    /**
     * @namespace
     * @property {jQuery} $el
     * @property {jQuery} $login
     * @property {jQuery} $loginControl
     * @property {jQuery} $pwd
     * @property {jQuery} $pwdControl
     * @property {jQuery} $antibot1Control
     * @property {jQuery} $antibot2Control
     * @property {jQuery} $formMessage
     * @property {jQuery} $loginErrorMsg
     * @property {jQuery} $pwdErrorMsg
     * @property {jQuery} $submitButton
     */
    let form = {
        $el: $signInForm,
        $login: $signInForm.find('.sign-in-form__login .textfield'),
        $loginControl: $signInForm.find('[name="login"]'),
        $pwd: $signInForm.find('.sign-in-form__pwd .textfield'),
        $pwdControl: $signInForm.find('[name="pwd"]'),
        $antibot1Control: $signInForm.find('[name="antibot-1"]'),
        $antibot2Control: $signInForm.find('[name="antibot-2"]'),
        $formMessage: $signInForm.find('.form-message')
    };

    form.$loginErrorMsg = form.$login.find('.textfield__error-message');
    form.$pwdErrorMsg = form.$pwd.find('.textfield__error-message');

    /**
     * Initialize
     * @param {jQuery} params.$submitButton
     */
    let init = params => {
        form.$submitButton = params.$submitButton;
        setEventListeners();
    };

    /**
     * Set event listeners
     */
    let setEventListeners = () => {
        form.$submitButton.on('click', () => {
            if (validate()) {
                submit();
            }
        });
    };

    /**
     * Validate form
     * @returns {boolean}
     */
    let validate = () => {
        let validation = true;

        let emptyLogin = !form.$loginControl.val().length;
        let emptyPwd = !form.$pwdControl.val().length;

        if (emptyLogin || emptyPwd) {
            if (emptyLogin) {
                validation = false;
                form.$loginErrorMsg.text('Вы не ввели логин');
                form.$login.addClass('textfield_state_error');

                form.$loginControl.one('focus', () => {
                    form.$loginErrorMsg.text('');
                    form.$login.removeClass('textfield_state_error');
                });
            }

            if (emptyPwd) {
                validation = false;
                form.$pwdErrorMsg.text('Вы не ввели пароль');
                form.$pwd.addClass('textfield_state_error');

                form.$pwdControl.one('focus', () => {
                    form.$pwdErrorMsg.text('');
                    form.$pwd.removeClass('textfield_state_error');
                });
            }
        } else {
            if (!form.$antibot1Control.prop('checked') || !parseInt(form.$antibot2Control.filter(':checked').val())) {
                validation = false;
                formMessage.show(form.$formMessage, {
                    text: 'Форма не предназначена для роботов'
                });
            }
        }
        
        return validation;
    };

    /**
     * Submit form
     */
    let submit = () => {
        // form.$el.submit();
        formMessage.show(form.$formMessage, {
            text: 'Спасибо за тестирование формы'
        });
    };
    
    return {
        init: init
    };
})();
