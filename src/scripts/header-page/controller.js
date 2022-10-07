/* eslint-disable no-undef */
import { HeaderView } from "./view";

class HeaderController {
    constructor(selector) {
        this.selector = selector;
        this.view = new HeaderView(selector);
    }

    render() {}
    initEvents() {
        this.initEventBtnLogout();
    }
    destroyEvents() {
        this.destroyEventBtnLogout();
    }
    initEventBtnLogout() {
        this._initEventBtnLogout = this.handleBtnLogout.bind(this);
        this.view.btnLogout.addEventListener("click", this._initEventBtnLogout);
    }
    destroyEventBtnLogout() {
        this.view.btnLogout.removeEventListener(
            "click",
            this._initEventBtnLogout
        );
    }

    handleBtnLogout() {
        document.cookie = "_token=;";
        location.reload();
    }
}
export { HeaderController };
