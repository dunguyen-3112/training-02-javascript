import { goto } from "./helpers/routes-helper";
import { LoginController } from "../scripts/login/controller";

class main {
    constructor() {
        try {
            goto("login-page", {
                ctrl: new LoginController("login-page"),
            });
        } catch (error) {
            console.log(error);
        }
    }
}
new main();
