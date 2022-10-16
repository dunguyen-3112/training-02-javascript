import { HomePageView } from "./view";

class HomePageController {
    constructor(selector) {
        this.view = new HomePageView(selector);
    }
}

export { HomePageController };
