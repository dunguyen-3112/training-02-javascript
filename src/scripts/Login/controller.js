/* eslint-disable no-undef */
import { CookiesHelper } from "../helpers/cookies-helper";
import { LoginModel } from "./model";
import { LoginView } from "./view";

class LoginController {
    constructor(selector) {
        this.model = new LoginModel();
        this.view = new LoginView(selector);
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
            console.log(error);
            throw error;
        }
    }
    initEvents() {
        this.initEventLoginBtn();
    }
    initEventLoginBtn() {
        document.formLogin?.btnLogin?.addEventListener(
            "click",
            this.handleLogin.bind(this)
        );
    }

    async handleLogin(e) {
        e.preventDefault();
        const username = document.formLogin.username.value,
            password = document.formLogin.password.value;
        try {
            const token = "ae2d32b5b7eaa7d201d513990b8e7cc35535142";
            const user = await this.model.login(username, password);
            user._token = token;
            await this.model.update(user);
            document.cookie = `_token=${token}`;
            location.reload();
        } catch (error) {
            console.log(error);
            throw new Error(
                "username and password are invalid or fail internet connection"
            );
        }
    }
}

export { LoginController };
