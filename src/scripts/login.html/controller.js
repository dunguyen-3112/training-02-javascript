import LoginModel from "./model";
import LoginView from "./view";
import { $ } from "../constant";

export default class LoginCtrl {
    /**
     *
     * @param {LoginModel} model
     * @param {LoginView} view
     */
    constructor(model, view) {
        this.view = view;
        this.model = model;
        this.render();
    }

    render() {
        let token = decodeURIComponent(document.cookie);
        if (token.split("=")[0] == "token") {
            console.log(token.split("=")[1]);
        } else {
            //document.cookie = `token=${this.model.uuid()}`;
        }
    }
}
