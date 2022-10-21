import { CookiesHelper } from "../helpers/cookies-helper";
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
        this.render();
    }

    #setEmployeeCount(employeeCount) {
        this.#view.template("Employee", employeeCount);
    }
    #setTodoCount(todoCount) {
        this.#view.template("Todo", todoCount);
    }

    async #loadData() {
        const employeeCount = await this.#model.getCountEmployees();
        this.#setEmployeeCount(employeeCount);
        const todoCount = await this.#model.getCountTodos();
        this.#setTodoCount(todoCount);
    }

    render() {
        this.#loadData();
        console.log("...Loading...");
    }
}

export { HomePageController };
