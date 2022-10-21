/* eslint-disable no-undef */
import { templateFormLogin } from "./templates";
import { $, rootSelector as root } from "../constant";

class LoginView {
    #selector;
    constructor(selector) {
        this.#selector = selector;
    }

    getForm() {
        return $(`${root} .${this.#selector} form[name="formLogin"]`);
    }

    getInputPassword() {
        return $(`${root} .${this.#selector} input[name="password"]`);
    }

    getRadioCheck() {
        return $(`${root} .${this.#selector} input.hide-password`);
    }

    renderFormLogin() {
        $(root).innerHTML = `
                <section class="${this.#selector}">
                    ${templateFormLogin}
                </section>`;
    }
}

export { LoginView };
