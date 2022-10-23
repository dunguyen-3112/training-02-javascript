/* eslint-disable no-undef */
import { $, rootSelector as root } from "../constant";

class HomePageView {
    #selector;
    #uname;
    /**
     *
     * @param {String} selector
     */
    constructor(selector, uname) {
        this.#selector = selector;
        this.#uname = uname;
        this.#templateLoader();
    }

    #templateLoader() {
        $(root).innerHTML = `
                <section class="${this.#selector}">
                    <div class="loader"></div>
                    <div class="cards"></div>
                    <h1 class="title">Hi ${this.#uname} !</h1>
                </section>`;
    }
    template(title, number) {
        $(`${root} section.${this.#selector} .loader`)?.remove();
        $(`${root} section.${this.#selector} .cards`).innerHTML += `
                <div class="card" style="background-color:#${
                    number < 1000
                        ? (1000 - (number % 1000)) * 8
                        : (10000000 - (number % 10000000)) * 8
                };">
                    <h2 class="card-title">${title}</h2>
                    <h4 class="card-desc">${number}</h4>
                </div>`;
    }
}

export { HomePageView };
