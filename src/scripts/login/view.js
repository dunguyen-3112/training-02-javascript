/* eslint-disable no-undef */
import { templateFormLogin } from "./templates";
import { $, rootSelector as root } from "../constant";

class LoginView {
    constructor(selector) {
        this.selector = selector;
    }

    renderFormLogin() {
        $(root).innerHTML = `
                <section class="${this.selector}">
                    ${templateFormLogin}
                </section>`;
    }
}

export { LoginView };
