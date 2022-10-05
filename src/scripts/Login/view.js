import { TemPlateFormLogin } from "./templates";
import { $ } from "../constant";

class LoginView {
    constructor(selector, parentSelector) {
        this.selector = selector;
        this.parentSelector = parentSelector;
    }

    renderFormLogin() {
        let content = document.createElement("div");
        content.classList.add(this.selector);
        content.innerHTML = TemPlateFormLogin;
        $(this.parentSelector).innerHTML = content.outerHTML;

        const check = document.querySelector("input.hide-password");
        check.addEventListener("click", function (e) {
            check.checked
                ? (document.querySelector('input[name="password"]').type =
                      "text")
                : (document.querySelector('input[name="password"]').type =
                      "password");
        });
    }
    renderBtnLogout() {
        $(this.parentSelector).innerHTML =
            '<button type="button" class="btn-logout btn btn-dark">Logout</button>';
    }
}
export { LoginView };
