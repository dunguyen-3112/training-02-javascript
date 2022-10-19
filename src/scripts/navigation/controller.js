/* eslint-disable no-undef */
import { $, pages } from "../constant";
import { goto } from "../helpers/routes-helper";
import { NavigationView } from "./view";
import { CookiesHelper } from "../helpers/cookies-helper";
import { subPublish } from "../helpers/state-manager";

class NavigationController {
    constructor(selector) {
        this.view = new NavigationView(selector);
        this.currentRoute = "home-page";
    }

    render() {
        pages.forEach((route) => {
            this.view.templateRoute(route);
        });
        this.initEvents();
    }

    initEvents() {
        const cookies = new CookiesHelper();
        pages.forEach((route) => {
            let link = $(`nav.navigation a[href="/${route}"]`);
            link.addEventListener("click", (e) => {
                e.preventDefault();

                subPublish.clear(route);
                subPublish.publish(`${this.currentRoute}:redirect`);
                this.currentRoute = route;
                if (route === "logout") {
                    cookies.set("_token", "");
                    cookies.set("_uid", "");
                    cookies.set("_isLogin", "");
                    this.view.clearTemplate();
                }
                history.pushState({}, route, `/${route}`);
                goto(route);
            });
        });
    }
}

export { NavigationController };
