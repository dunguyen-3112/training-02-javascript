/* eslint-disable no-undef */
import { $ } from "../constant";

class NavigationView {
    constructor(selector) {
        this.content = document.createElement("nav");
        this.content.className = selector;
        $("body").append(this.content);
    }

    templateRoute(route) {
        console.log(route);
        this.content.innerHTML += `
            <a href="/${route}">${route.split("-").join(" ")}</a>
        `;
    }
}

export { NavigationView };
