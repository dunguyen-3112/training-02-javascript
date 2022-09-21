import { $ } from "../constant";
export default class LoginView {
    constructor() {
        $(".content").innerHTML = "";
        $(".content").innerHTML = this.renderForm();
        this.form = document.formLogin;
        this.username = document.formLogin.username;
        this.password = document.formLogin.password;
        this.btnLogin = document.formLogin.btnLogin;
        this.btnSignUp = document.formLogin.btnSignUp;
    }

    renderForm = () => {
        return `
            <div class="login" >
                <form name="formLogin" action="#" method="post">
                    <label class="form-2">
                        <span>Username</span>
                        <input type="text" placeholder="Please type your Username " name="username" class="form-control" required>
                    </label
                    <label class="form-2">
                        <span>Password</span>
                        <input type="password" placeholder="Please type your Password " name="password" class="form-control" required>
                    </label
                    <div class="form-action">
                        <button type="submit" class="btn btn-dark" name="btnLogin">Login</button>
                        <button type="button" class="btn btn-dark" name="btnSignUp">Sign Up</button>
                    </div>
                </form>
            </div>
        `;
    };
}
