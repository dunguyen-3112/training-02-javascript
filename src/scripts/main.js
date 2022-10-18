/* eslint-disable no-undef */
import { goto } from "./helpers/routes-helper";
class main {
    constructor() {
        try {
            goto("home-page");
        } catch (error) {
            console.log(error);
        }
    }
}

new main();
