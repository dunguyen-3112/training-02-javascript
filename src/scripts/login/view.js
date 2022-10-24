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

    templateLoader() {
        $(`${root} .${this.#selector}`).innerHTML =
            '<div class="loader"></div>';
    }
    templateError() {
        $(`${root} .${this.#selector}`).innerHTML =
            '<p class="error">Check connect internet of you or username and password invalid!</p>';
    }

    renderFormLogin() {
        $(root).innerHTML = `
                <section class="${this.#selector}">
                    ${templateFormLogin}
                </section>`;
    }
}

export { LoginView };
