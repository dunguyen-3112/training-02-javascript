/* eslint-disable no-undef */
import { TemPlateFormLogin } from "./templates";
import { $, rootSelector } from "../constant";

class LoginView {
    constructor(selector) {
        this.selector = selector;
    }

    renderFormLogin() {
        let content = document.createElement("section");
        content.classList.add(this.selector);
        content.innerHTML = TemPlateFormLogin;
        $(rootSelector).innerHTML = content.outerHTML;

        const check = document.querySelector("input.hide-password");
        check.addEventListener("click", () => {
            check.checked
                ? (document.querySelector('input[name="password"]').type =
                      "text")
                : (document.querySelector('input[name="password"]').type =
                      "password");
        });
    }
    renderBtnLogout() {
        $(rootSelector).innerHTML =
            '<button type="button" class="btn-logout btn btn-dark">Logout</button>';
    }
}
export { LoginView };
