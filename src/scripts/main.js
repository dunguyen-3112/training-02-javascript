import { goto } from "./helpers/routes-helper";
class main {
    constructor() {
        try {
            goto("login-page");
        } catch (error) {
            console.log(error);
        }
    }
}
new main();
