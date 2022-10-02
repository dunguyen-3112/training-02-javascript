import EmployeesCtrl from "../employees/controller";
import { CookiesHelper } from "../helpers/cookies-helper";
import { LoginModel } from "./model";
import { LoginView } from "./view";
import { $, loginSelector, employeeSelector } from "../constant";

class LoginController {
    static model = new LoginModel();

    constructor() {
        this.view = new LoginView(loginSelector);
        this.cookies = new CookiesHelper();
        this.model = 1;
    }

    async render() {
        const token = this.cookies.get("_token");
        if (
            token?.length > 0 &&
            (await LoginController.model.getUser(token))?.isLogin
        ) {
            this.view.clear();
            this.view.renderBtnLogout();

            const ctrl = new EmployeesCtrl(employeeSelector);
            ctrl.render();
        } else {
            this.view.renderFormLogin();
        }
        this.destroyEvents();
        this.initEvents();
    }
    initEvents() {
        this.initEventLoginBtn();
        this.initEventLogoutBtn();
    }
    initEventLogoutBtn() {
        $(".btn-logout")?.addEventListener("click", this.handleBtnLogout);
    }

    initEventLoginBtn() {
        document.formLogin?.btnLogin?.addEventListener(
            "click",
            this.handleLogin
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
            const user = await LoginController.model.login(username, password);
            const token = "ae2d32b5b7eaa7d201d513990b8e7cc35535142";
            console.log(user);
            user._token = token;
            const user1 = await LoginController.model.update(user);
            document.cookie = `_token=${token}`;
        } catch (error) {
            throw error;
        }
        location.reload();
    }
    destroyEventLogin() {
        document.formLogin?.btnLogin?.removeEventListener(
            "click",
            this.handleLogin
        );
    }
    destroyEventLogout() {
        $(".btn-logout")?.removeEventListener("click", this.handleBtnLogout);
    }
    destroyEvents() {
        this.destroyEventLogin();
        this.destroyEventLogout();
    }
}

export { LoginController };
