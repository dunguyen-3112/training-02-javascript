import { LoginController } from "./Login/controller";

class main {
    constructor() {
        try {
            const login = new LoginController("login-page");
            login.render();
        } catch (error) {
            throw error;
        }
    }
}

try {
    new main();
} catch (error) {
    console.log("Main Error: ", error.message);
}
