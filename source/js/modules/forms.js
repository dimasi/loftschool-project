const lodashFilter = require('lodash/filter');

/** 
 * @module forms
 * Validate forms
 * */
module.exports = (() => {
    /** Params and validation rules */
    let _params = [
        {
            formName: `auth`,
            fields: [
                {
                    fieldName: `username`,
                    required: true,
                    messages: {
                        required: `Вы не ввели логин`
                    }
                },
                {
                    fieldName: `password`,
                    required: true,
                    messages: {
                        required: `Вы не ввели пароль`
                    }
                }
            ]
        },
        {
            formName: `contact`,
            fields: [
                {
                    fieldName: `name`,
                    required: true,
                    messages: {
                        required: `Укажите ваше имя`
                    }
                },
                {
                    fieldName: `email`,
                    type: `email`,
                    required: true,
                    messages: {
                        required: `Укажите ваш e-mail`,
                        format: `Укажите ваш e-mail в правильном формате`
                    }
                },
                {
                    fieldName: `message`,
                    required: true,
                    messages: {
                        required: `Напишите что-нибудь`
                    }
                }
            ]
        }
    ];

    /** Find and initialize forms */
    let _init = () => {
        _params.forEach(formParams => {
            let $form = $(`form[name='${formParams.formName}']`);

            if ($form.length) {
                _initForm({
                    $el: $form,
                    params: formParams
                });
            }
        });

        $(`.form-message__close`).on(`click`, e => {
            $(e.currentTarget).closest(`.form-message`).removeClass(`form-message_state_error`).fadeOut();
        });
    };

    /**
     * Initialize single form
     * @param {object} params.form
     */
    let _initForm = form => {
        form.$el.on(`change`, e => {
            e.preventDefault();
            _checkCorrect(form, $(e.target).attr(`name`));
        });

        form.$el.on(`submit`, e => {
            e.preventDefault();
            let errors = _validate(form);
            if (errors.length) {
                _renderErrors(errors);
            } else {
                let $formGuard = form.$el.find(`.form-guard`);
                if ($formGuard.length) {
                    if (!_validateFormGuard($formGuard)) {
                        _showFormMessage(form, {
                            text: `Форма не предназначена для роботов`,
                            status: `error`
                        });
                        _resetForm(form);
                    } else {
                        _submitForm(form);
                    }
                } else {
                    _submitForm(form);
                }
            }
        });
    };

    /**
     * Show form message
     * @param {object} params.form
     * @param {object} params.message - Object with message text and status
     */
    let _showFormMessage = (form, message) => {
        let $formMessage = form.$el.find(`.form-message`);
        $formMessage.find(`.form-message__text`).text(message.text);
        if (message.status == `error`) {
            $formMessage.addClass(`form-message_state_error`);
        }
        $formMessage.fadeIn();
    };

    /**
     * Reset fields and remove state css-classes
     * @param {object} params.form
     */
    let _resetForm = form => {
        form.$el[0].reset();
        form.$el.find(`.formfield_state_correct`).removeClass(`formfield_state_correct`);
    };

    /** Fake submit */
    let _submitForm = form => {
        // Temp. Fake request
        if (form.params.formName == `contact`) {
            window.contactFormSubmitCounter = window.contactFormSubmitCounter || 0;
            if (window.contactFormSubmitCounter % 2 == 0) {
                _showFormMessage(form, {
                    text: `Сообщение отправлено!`
                });
            } else {
                _showFormMessage(form, {
                    text: `Возникла ошибка при отправке сообщения!`,
                    status: `error`
                });
            }
            window.contactFormSubmitCounter++;
            if (window.contactFormSubmitCounter > 1) {
                window.contactFormSubmitCounter = 0;
            }
        }

        if (form.params.formName == `auth`) {
            _showFormMessage(form, {
                text: `Спасибо за тестирование формы! Функционал авторизации пока не реализован.`
            });
        }

        _resetForm(form);
    };

    /**
     * Validate form fields
     * @param {jQuery} $formGuard
     * @returns {boolean}
     */
    let _validateFormGuard = $formGuard => {
        return $formGuard.find(`[name='antibot']`).is(`:checked`) && $formGuard.find(`[name='antibot2']:checked`).val() == 1;
    };

    /**
     * Validate form fields
     * @param {object} params.form
     * @returns {array} Array with error objects
     */
    let _validate = form => {
        let errors = [];

        form.params.fields.forEach(field => {
            let $field = form.$el.find(`[name='${field.fieldName}']`);

            let val;
            if ($field.tagName == `textarea`) {
                val = $field.text();
            } else {
                val = $field.val();
            }

            // Email fields
            if (field.type == `email`) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!re.test(val)) {
                    errors.push({
                        $field: $field,
                        errorMessage: field.messages.format
                    });
                }
            }

            // Required fields
            if (field.required) {
                if (!val.length) {
                    errors.push({
                        $field: $field,
                        errorMessage: field.messages.required
                    });
                }
            }
        });

        return errors;
    };

    /**
     * Show errors
     * @param {array} params.errors
     */
    let _renderErrors = errors => {
        errors.forEach(error => {
            let $el = error.$field.closest(`.formfield`);
            let $message = $el.find(`.formfield__error-message`);

            $el.addClass(`formfield_state_error`);
            $message.text(error.errorMessage).fadeIn();

            $el.find(`.formfield__control`).one(`focus`, () => {
                $el.removeClass(`formfield_state_error`);
                $message.text(``).fadeOut();
            });
        });
    };

    /**
     * Check the field for correct value
     * @param {object} params.form
     * @param {object} params.fieldName
     */
    let _checkCorrect = (form, fieldName) => {
        let $field = form.$el.find(`[name='${fieldName}']`);
        let $el = $field.closest(`.formfield`);
        let errors = _validate(form);
        let withoutErrors = lodashFilter(errors, error => {
            return error.$field.is($field);
        }).length == 0;
        
        if (withoutErrors) {
            $el.addClass(`formfield_state_correct`);
        } else {
            $el.removeClass(`formfield_state_correct`);
        }
    };

    return {
        init: _init
    };
})();
