import { EmployeesCtrl } from "../employees/controller";
import { CookiesHelper } from "../helpers/cookies-helper";
import { LoginModel } from "./model";
import { LoginView } from "./view";
import { $ } from "../constant";
import { goto } from "../helpers/routes-helper";

class LoginController {
    constructor(selector, parentSelector) {
        console.log("LoginController:", selector, parentSelector);
        this.model = new LoginModel();
        this.view = new LoginView(selector, parentSelector);
        this.cookies = new CookiesHelper();
    }

    async render() {
        const token = this.cookies.get("_token");
        try {
            if (
                token?.length > 0 &&
                (await this.model.getUser(token))?.isLogin
            ) {
                return true;
            } else {
                this.view.renderFormLogin();
                this.initEventLoginBtn();
            }
        } catch (error) {
            console.log("LoginController render:", error.message);
        }
    }
    initEvents() {
        this.initEventLoginBtn();
    }
    initEventLoginBtn() {
        console.log("initEventLoginBtn");

        document.formLogin?.btnLogin?.addEventListener(
            "click",
            this.handleLogin.bind(this)
        );
    }

    initEventLogoutBtn() {
        $(".btn-logout")?.addEventListener("click", this.handleBtnLogout);
    }

    handleBtnLogout() {
        document.cookie = "_token=;";
        location.reload();
    }
    async handleLogin(e) {
        e.preventDefault();
        const username = document.formLogin.username.value,
            password = document.formLogin.password.value;
        try {
            const token = "ae2d32b5b7eaa7d201d513990b8e7cc35535142";
            const user = await this.model.login(username, password);
            user._token = token;
            const user1 = await this.model.update(user);
            document.cookie = `_token=${token}`;
            location.reload();
        } catch (error) {
            console.log(
                "Error: ",
                "username and password are invalid or fail internet connection"
            );
        }
    }
}

export { LoginController };
