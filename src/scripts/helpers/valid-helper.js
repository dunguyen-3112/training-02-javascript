/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */

import { $ } from "../constant";

/**
 *
 * @param {{rules:[],formGroupSelector:String,errorSelector:String,onSubmit:function,form:String}} options
 *
 *
 */
function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    function validate(inputElement, rule) {
        var errorElement = getParent(
            inputElement,
            options.formGroupSelector
        ).querySelector(options.errorSelector);
        var errorMessage;

        // Get rule of selector
        var rules = selectorRules[rule.selector];

        // For rule & check if error then stop check
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case "radio":
                case "checkbox":
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ":checked")
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add(
                "invalid"
            );
        } else {
            errorElement.innerText = "";
            getParent(inputElement, options.formGroupSelector).classList.remove(
                "invalid"
            );
        }

        return !errorMessage;
    }

    // get element of form need validate

    var formElement = $(options.form);

    if (formElement) {
        // Submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;

            // For rules and validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement[rule.selector];
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                //submitwith javascript
                if (typeof options.onSubmit === "function") {
                    var enableInputs = formElement.querySelectorAll("[name]");
                    var formValues = Array.from(enableInputs).reduce(function (
                        values,
                        input
                    ) {
                        switch (input.type) {
                            case "radio":
                                values[input.name] = formElement.querySelector(
                                    'input[name="' + input.name + '"]:checked'
                                ).value;
                                break;
                            case "checkbox":
                                if (!input.matches(":checked")) {
                                    values[input.name] = "";
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case "file":
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }

                        return values;
                    },
                    {});
                    if (formElement.getAttribute("data-id"))
                        formValues.id = formElement.getAttribute("data-id");

                    options.onSubmit(formValues);
                }
                //submit default
                else {
                    formElement.submit();
                }
            }
        };

        // for rule and listens event
        options.rules.forEach(function (rule) {
            // Save rules input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElement = formElement[rule.selector];

            // Handle when use blur input
            inputElement.onblur = function () {
                validate(inputElement, rule);
            };

            // handle when user type input
            inputElement.oninput = function () {
                var errorElement = getParent(
                    inputElement,
                    options.formGroupSelector
                ).querySelector(options.errorSelector);

                errorElement.innerText = "";
                getParent(
                    inputElement,
                    options.formGroupSelector
                ).classList.remove("invalid");
            };
        });
    }
}

/**
 *
 * @param {String} selector
 * @param {String} message
 * @returns
 */
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || "Please enter this field!";
        },
    };
};
/**
 *
 * @param {String} selector
 * @param {String} message
 * @returns
 */
Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value)
                ? undefined
                : message || "This Field is email";
        },
    };
};
/**
 *
 * @param {String} selector
 * @param {String} message
 * @returns
 */
Validator.isPhone = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\d{9}$/;
            return regex.test(value)
                ? undefined
                : message || "This Field is Phone and include 9 number!";
        },
    };
};
/**
 *
 * @param {String} selector
 * @param {String} message
 * @returns
 */
Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min
                ? undefined
                : message || `Please type minimum ${min} characters`;
        },
    };
};
/**
 *
 * @param {String} selector
 * @param {String} message
 * @returns
 */
Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue()
                ? undefined
                : message || "Invalid value!";
        },
    };
};
/**
 *
 * @param {String} selector
 * @param {String} message
 * @returns
 */
Validator.clear = function (form) {
    document[form]
        .querySelectorAll("label.form-group")
        .forEach(function (element) {
            element.classList.remove("invalid");
        });
};

Validator.isUrl = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex =
                /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            return regex.test(value)
                ? undefined
                : message || "This Field is url!";
        },
    };
};
export { Validator };
