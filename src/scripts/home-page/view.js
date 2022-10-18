/* eslint-disable no-undef */
import { $, rootSelector as root } from "../constant";

class HomePageView {
    /**
     *
     * @param {String} selector
     */
    constructor(selector) {
        this.selector = selector;
        this.render();
    }

    render() {
        $(root).innerHTML = `
                <section class="${this.selector}">
                    <h1>Home Page</h1>
                </section>`;
    }
}

export { HomePageView };
