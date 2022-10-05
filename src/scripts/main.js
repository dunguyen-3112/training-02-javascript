import { goto } from "./helpers/routes-helper";
import { LoginController } from "../scripts/login/controller";
import { rootSelector } from "./constant";

class main {
    constructor() {
        goto("login-page", {
            ctrl: new LoginController("login-page"),
        });
    }
}
new main();
