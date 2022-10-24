/* eslint-disable no-undef */
import { $, pages } from "../constant";
import { goto } from "../helpers/routes-helper";
import { NavigationView } from "./view";
import { CookiesHelper } from "../helpers/cookies-helper";
import { subPublish } from "../helpers/state-manager";

class NavigationController {
    #__handleClick;
    #selector;
    constructor(selector) {
        this.#selector = selector;
        this.view = new NavigationView(selector);
        this.currentRoute = "home-page";
    }

    render() {
        pages.forEach((route) => {
            this.view.templateRoute(route);
        });
        this.initEvents();
    }

    #handleClick(e) {
        e.preventDefault();
        const element = e.path[0];
        if (element.className.match("route")) {
            const href = element.getAttribute("href").replace("/", "");
            this.currentRoute = href;
            if (href === "logout") {
                const cookies = new CookiesHelper();
                cookies.set("_token", "");
                cookies.set("_uid", "");
                cookies.set("_isLogin", "");
                this.view.clearTemplate();
            }
            history.pushState({}, href, `/${href}`);
            goto(href);
        }
    }

    initEvents() {
        this.#__handleClick = this.#handleClick.bind(this);
        $("header nav.navigation").addEventListener(
            "click",
            this.#__handleClick
        );
    }
}

export { NavigationController };
