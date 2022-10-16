/* eslint-disable no-undef */
import { templateFormLogin } from "./templates";
import { $, rootSelector as root } from "../constant";

class LoginView {
    constructor(selector) {
        this.selector = selector;
    }

    renderFormLogin() {
        let content = document.createElement("section");
        content.classList.add(this.selector);
        content.innerHTML = templateFormLogin;
        $(root).innerHTML += content.outerHTML;

        const check = document.querySelector("input.hide-password");
        check.addEventListener("click", () => {
            check.checked
                ? (document.querySelector('input[name="password"]').type =
                      "text")
                : (document.querySelector('input[name="password"]').type =
                      "password");
        });
    }
}
export { LoginView };
