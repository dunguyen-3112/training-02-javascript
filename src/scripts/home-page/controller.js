import { CookiesHelper } from "../helpers/cookies-helper";
import { subPublish } from "../helpers/state-manager";
import { HomePageModel } from "./model";
import { HomePageView } from "./view";

class HomePageController {
    #model;
    #view;
    #cookieHelper;
    /**
     *
     * @param {String} selector
     */
    constructor(selector) {
        this.#cookieHelper = new CookiesHelper();
        const uname = this.#cookieHelper.get("_uname");
        this.#view = new HomePageView(selector, uname);
        this.#model = new HomePageModel();

        subPublish.clear("page");
        this.render();
    }

    #setEmployeeCount(employeeCount) {
        this.#view.template("Employee", employeeCount);
    }
    #setTodoCount(todoCount) {
        this.#view.template("Todo", todoCount);
    }

    async #loadData() {
        try {
            const meta = await this.#model.getMeta();
            this.#setEmployeeCount(meta.employeeC);
            this.#setTodoCount(meta.todoC);
        } catch (error) {
            throw error;
        }
    }

    render() {
        try {
            this.#loadData();
        } catch (error) {
            throw error;
        }
    }
}

export { HomePageController };
