import { HomePageView } from "./view";

class HomePageController {
    /**
     *
     * @param {String} selector
     */
    constructor(selector) {
        this.view = new HomePageView(selector);
    }
}

export { HomePageController };
