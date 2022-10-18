/* eslint-disable no-undef */
import { $, rootSelector as root } from "../constant";
import { CookiesHelper } from "../helpers/cookies-helper";
import { Validator } from "../helpers/valid-helper";
import { HomePageController } from "../home-page/controller";
import { LoginModel } from "./model";
import { LoginView } from "./view";
import { NavigationController } from "../navigation/controller";

const cookies = new CookiesHelper();
class LoginController {
    constructor(selector) {
        this.selector = selector;
        this.model = new LoginModel();
    }
    async loadData() {
        const _token = cookies.get("_token");
        if (_token?.length > 0) {
            const user = await this.model.checkLogin(_token);
            this.setUser(user);
            return;
        }
        this.setUser();
    }
    setUser(user) {
        if (user) {
            this.user = user;
            const nav = new NavigationController("navigation");
            nav.render();
            new HomePageController("home-page");
            history.pushState("", "", "/home-page");
        } else {
            this.render();
            this.initEvents();
        }
    }

    render() {
        this.view = new LoginView(this.selector);
        this.view.renderFormLogin();
        this.form = $(`${root} .${this.view.selector} form[name="formLogin"]`);
        this.initEvents();
    }
    initEvents() {
        const check = $(`${root} .${this.view.selector} input.hide-password`);
        check.addEventListener("click", () => {
            const inputPassword = $(
                `${root} .${this.view.selector} input[name="password"]`
            );
            check.checked
                ? (inputPassword.type = "text")
                : (inputPassword.type = "password");
        });

        Validator({
            rules: [
                Validator.minLength("username", 6),
                Validator.minLength("password", 4),
            ],
            formGroupSelector: ".form-group",
            errorSelector: ".form-message",
            onSubmit: this.handleLogin.bind(this),
            form: `${root} .${this.view.selector} form[name="formLogin"]`,
        });
    }

    async handleLogin(data) {
        const username = data.username;
        const password = data.password;
        try {
            const token = "ae2d32b5b7eaa7d201d513990b8e7cc35535142";
            const user = await this.model.login(username, password);
            user._token = token;
            await this.model.update(user);
            cookies.set("_token", token);
            cookies.set("_uid", user.id);
            cookies.set("_isLogin", user.isLogin);
            this.setUser(user);
        } catch (error) {
            console.log(error);
            throw new Error(
                "username and password are invalid or fail internet connection"
            );
        }
    }
}

export { LoginController };
