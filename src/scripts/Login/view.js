import { TemPlateFormLogin } from "../template/login";
import { $, loginSelector } from "../constant";

class LoginView {
    constructor() {
        this.rootSelector = loginSelector;
    }

    renderFormLogin() {
        let content = document.createElement("div");
        content.classList.add(this.rootSelector);
        content.innerHTML = TemPlateFormLogin;
        document.querySelector("#root").innerHTML = content.outerHTML;

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
        $("#root").innerHTML =
            '<button type="button" class="btn-logout btn btn-dark">Logout</button>';
    }
}
export { LoginView };
