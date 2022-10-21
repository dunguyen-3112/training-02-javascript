/* eslint-disable no-undef */
import { rootSelector as root } from "../constant";
import { CookiesHelper } from "../helpers/cookies-helper";
import { Validator } from "../helpers/valid-helper";
import { HomePageController } from "../home-page/controller";
import { LoginModel } from "./model";
import { LoginView } from "./view";
import { NavigationController } from "../navigation/controller";

const cookies = new CookiesHelper();
class LoginController {
    #selector;
    #model;
    #view;
    #user;

    constructor(selector) {
        this.#selector = selector;
        this.#model = new LoginModel();
    }
    async #loadData(_token) {
        try {
            const user = await this.#model.checkLogin(_token);
            this.#setUser(user);
            return;
        } catch (error) {
            console.log("ERROR CheckToken: ", _token);
            this.#setUser();
        }
    }
    #setUser(user) {
        if (user) {
            this.#user = user;
            const nav = new NavigationController("navigation");
            nav.render();
            new HomePageController("home-page");
            history.pushState("", "", "/home-page");
        } else {
            cookies.set("_token", "");
            cookies.set("_uid", "");
            cookies.set("_isLogin", "");
            cookies.set("_uname", "");
            this.render();
            this.#initEvents();
        }
    }

    render() {
        const _token = cookies.get("_token");
        if (_token?.length > 0) {
            this.#loadData(_token);
            return;
        }

        this.#view = new LoginView(this.#selector);
        this.#view.renderFormLogin();
        this.#initEvents();
    }
    #initEvents() {
        const check = this.#view.getRadioCheck();
        check.addEventListener("click", () => {
            const inputPassword = this.#view.getInputPassword();
            check.checked
                ? (inputPassword.type = "text")
                : (inputPassword.type = "password");
        });

        Validator({
            rules: [
                Validator.isRequired("username"),
                Validator.minLength("password", 4),
            ],
            formGroupSelector: ".form-group",
            errorSelector: ".form-message",
            onSubmit: this.#handleLogin.bind(this),
            form: `${root} .${this.#selector} form[name="formLogin"]`,
        });
    }

    async #handleLogin(data) {
        const username = data.username;
        const password = data.password;
        try {
            const token = "ae2d32b5b7eaa7d201d513990b8e7cc35535142";
            const user = await this.#model.login(username, password);
            user._token = token;
            await this.#model.update(user);
            cookies.set("_token", token);
            cookies.set("_uid", user.id);
            cookies.set("_isLogin", user.isLogin);
            cookies.set("_uname", user.name);
            this.#setUser(user);
        } catch (error) {
            console.log(error);
            throw new Error(
                "username and password are invalid or fail internet connection"
            );
        }
    }
}

export { LoginController };
