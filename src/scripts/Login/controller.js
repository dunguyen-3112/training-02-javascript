import EmployeesCtrl from "../employees/controller";
import { CookiesHelper } from "../helpers/cookies-helper";
import { LoginModel } from "./model";
import { LoginView } from "./view";
import { $, employeeSelector } from "../constant";

class LoginController {
    constructor() {
        this.model = new LoginModel();
        this.view = new LoginView();
        this.cookies = new CookiesHelper();
    }

    async render() {
        const token = this.cookies.get("_token");
        try {
            if (
                token?.length > 0 &&
                (await this.model.getUser(token))?.isLogin
            ) {
                this.view.renderBtnLogout();

                const ctrl = new EmployeesCtrl(employeeSelector);
                ctrl.render();
                this.initEventLogoutBtn();
            } else {
                this.view.renderFormLogin();
            }
            this.initEvents();
        } catch (error) {
            console.log("LoginController render:", error.message);
            throw error;
        }
    }
    initEvents() {
        this.initEventLoginBtn();
    }
    initEventLogoutBtn() {
        $(".btn-logout")?.addEventListener("click", this.handleBtnLogout);
    }

    initEventLoginBtn() {
        console.log("initEventLoginBtn");

        document.formLogin?.btnLogin?.addEventListener(
            "click",
            this.handleLogin.bind(this)
        );
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
