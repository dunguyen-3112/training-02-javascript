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

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = getParent(
            inputElement,
            options.formGroupSelector
        ).querySelector(options.errorSelector);
        var errorMessage;

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];

        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
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

    // Lấy element của form cần validate
    var formElement = $(options.form);

    if (formElement) {
        // Khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;

            // Lặp qua từng rules và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement[rule.selector];
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Trường hợp submit với javascript
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
                // Trường hợp submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            }
        };

        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(function (rule) {
            // Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElement = formElement[rule.selector];

            // Xử lý trường hợp blur khỏi input
            inputElement.onblur = function () {
                validate(inputElement, rule);
            };

            // Xử lý mỗi khi người dùng nhập vào input
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
            return value ? undefined : message || "Vui lòng nhập trường này";
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
                : message || "Trường này phải là email";
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
                : message || "Trường này phải là Phone";
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
                : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
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
                : message || "Giá trị nhập vào không chính xác";
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
export { Validator };
