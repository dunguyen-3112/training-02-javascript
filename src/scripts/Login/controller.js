import EmployeesCtrl from "../employees/controller";
import { CookiesHelper } from "../helpers/cookies-helper";
import { LoginModel } from "./model";
import { LoginView } from "./view";
import { $ } from "../constant";
class LoginController {
    constructor(rootSelector) {
        this.view = new LoginView(rootSelector);
        this.model = new LoginModel();
        this.cookies = new CookiesHelper();
        this.ctrlEmployees = new EmployeesCtrl("employees");
    }

    async render() {
        const token = this.cookies.get("_token");
        if (token && (await this.model.getUser(token))?.isLogin) {
            this.view.renderBtnLogin();
            this.ctrlEmployees.render();
        } else {
            this.view.renderFormLogin();
        }
        this.initEvents();
    }
    initEvents() {
        this.initEventLogoutBtn();
        this.initEventLoginBtn();
    }
    initEventLogoutBtn() {
        $(".btn-logout")?.addEventListener("click", () => {
            document.cookie = "_token=;";
            this.view.renderFormLogin();
        });
    }
    initEventLoginBtn() {
        const btnLogin = document.formLogin.btnLogin;
        btnLogin.addEventListener("click", this.handleLogin);
    }

    async handleLogin(e) {
        e.preventDefault();
        const username = document.formLogin.username.value,
            password = document.formLogin.password.value;
        console.log(this.model);
        const user = await this.model.login(username, password);
        console.log(user);
    }
    destroyEvents() {}
}
export { LoginController };
