/* eslint-disable no-undef */
import { $ } from "../constant";

class HomePageView {
    constructor(selector) {
        this.selector = selector;
        $("#root").innerHTML = `<section class="${selector}"></section>`;
        $(`#root .${selector}`).innerHTML += "<h1>Home Page</h1>";
    }
}

export { HomePageView };
