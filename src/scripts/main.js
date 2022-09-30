import { LoginController } from "./Login/controller";

class main {
    constructor() {
        const login = new LoginController("login-page");
        login.render();
        console.log(1);
    }
}

new main();
