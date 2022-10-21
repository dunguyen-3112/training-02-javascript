/* eslint-disable no-undef */
import { $ } from "../constant";

class NavigationView {
    #selector;

    constructor(selector) {
        this.#selector = selector;
        $("header")?.remove();
    }

    templateRoute(route) {
        if (!$(`header nav.${this.#selector}`)) {
            $("body").innerHTML += `
                    <header>
                        <nav class="${this.#selector}"></nav>
                    </header>`;
        }
        $(`header nav.${this.#selector}`).innerHTML += `
                <a href="/${route}">
                    ${route.split("-").join(" ")}
                </a>
        `;
    }
    clearTemplate() {
        $(`header`).remove();
    }
}

export { NavigationView };
