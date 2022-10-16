/* eslint-disable no-undef */
import { $, rootSelector as root } from "../constant";
import { CookiesHelper } from "../helpers/cookies-helper";
import { goto } from "../helpers/routes-helper";
import { Validator } from "../helpers/valid-helper";
import { LoginModel } from "./model";
import { LoginView } from "./view";

class LoginController {
    constructor(selector) {
        this.model = new LoginModel();
        this.view = new LoginView(selector);
        this.cookies = new CookiesHelper();
    }
    async checkLogin() {
        const token = this.cookies.get("_token");
        if (token?.length > 0) {
            const user = await this.model.getUser(token);
            this.user = user;
            return user.isLogin;
        }
    }

    render() {
        this.view.renderFormLogin();
        this.form = $(`${root} .${this.view.selector} form[name="formLogin"]`);
        this.initEvents();
    }
    initEvents() {
        //this.initEventLoginBtn();
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
            document.cookie = `_token=${token}`;
            goto("login-page");
        } catch (error) {
            console.log(error);
            throw new Error(
                "username and password are invalid or fail internet connection"
            );
        }
    }
}

export { LoginController };
