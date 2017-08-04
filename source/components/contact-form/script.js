import formMessage from 'Components/form-message/script';

export default (()=> {
    /**
     * @param params
     */
    let init = params => {
        let form = {
            $el: params.$el,
            $name: params.$el.find('.contact-form__name .textfield'),
            $nameControl: params.$el.find('[name="name"]'),
            $email: params.$el.find('.contact-form__email .textfield'),
            $emailControl: params.$el.find('[name="email"]'),
            $message: params.$el.find('.contact-form__message .textarea'),
            $messageControl: params.$el.find('[name="message"]')
        };
        form.$nameErrorMsg = form.$name.find('.textfield__error-message');
        form.$emailErrorMsg = form.$email.find('.textfield__error-message');
        form.$messageErrorMsg = form.$message.find('.textarea__error-message');
        form.$submitButton = params.$submitButton;
        form.$resetButton = params.$resetButton;

        setEventListeners(form);
    };

    /**
     * Set event listeners
     * @param form
     */
    let setEventListeners = form => {
        form.$submitButton.on('click', () => {
            if (validate(form)) {
                submit(form);
            }
        });

        form.$resetButton.on('click', () => {
            resetForm(form);
        });
    };

    /**
     * Validate form
     * @param form
     * @returns {boolean}
     */
    let validate = form => {
        let validation = true;

        let emptyName = !form.$nameControl.val().length;
        let emptyEmail = !form.$emailControl.val().length;
        let emptyMessage = !form.$messageControl.val().length;

        if (emptyName || emptyEmail || emptyMessage) {
            if (emptyName) {
                validation = false;
                form.$nameErrorMsg.text('Вы не указали имя');
                form.$name.addClass('textfield_state_error');

                form.$nameControl.one('focus', () => {
                    form.$nameErrorMsg.text('');
                    form.$name.removeClass('textfield_state_error');
                });
            }

            if (emptyEmail) {
                validation = false;
                form.$emailErrorMsg.text('Вы не указали email');
                form.$email.addClass('textfield_state_error');

                form.$emailControl.one('focus', () => {
                    form.$emailErrorMsg.text('');
                    form.$email.removeClass('textfield_state_error');
                });
            }

            if (emptyMessage) {
                validation = false;
                form.$messageErrorMsg.text('Вы не написали текст сообщения');
                form.$message.addClass('textarea_state_error');

                form.$messageControl.one('focus', () => {
                    form.$messageErrorMsg.text('');
                    form.$message.removeClass('textarea_state_error');
                });
            }
        } else {
            validation = false;
            formMessage.show(form.$el.find('.form-message'), {
                text: 'Спасибо за тест формы!'
            });
        }
        
        return validation;
    };

    /**
     * Submit
     * @param form
     */
    let submit = form => {
        form.$el.submit();
    };

    /**
     * Reset form
     * @param form
     */
    let resetForm = form => {
        form.$el[0].reset();
    };
    
    return {
        init: init
    };
})();
