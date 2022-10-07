/* eslint-disable no-undef */
import { $, rootSelector as root } from "../constant";

class HeaderView {
    constructor(selector) {
        this.selector = selector;
        this.conent = document.createElement("header");
        this.conent.className = selector;
        $(root).appendChild(this.conent);
        this.renderBtnLogout();

        this.btnLogout = this.conent.querySelector("#btnLogout");
    }

    renderBtnLogout() {
        this.conent.innerHTML =
            '<button type="button" class="btn btn-dark" id="btnLogout">Logout</button>';
    }
}
export { HeaderView };
