/* eslint-disable no-undef */
import { $, pages } from "../constant";
import { goto } from "../helpers/routes-helper";
import { NavigationView } from "./view";

class NavigationController {
    constructor(selector) {
        this.routes = pages;
        this.view = new NavigationView(selector);
    }

    render() {
        this.routes.forEach((route) => {
            this.view.templateRoute(route);
        });
        this.initEvents();
    }

    initEvents() {
        this.routes.forEach((route) => {
            let link = $(`nav.navigation a[href="/${route}"]`);
            link.addEventListener("click", (e) => {
                e.preventDefault();

                history.pushState({}, route, `/${route}`);
                goto(route);
            });
        });
    }
}

export { NavigationController };
