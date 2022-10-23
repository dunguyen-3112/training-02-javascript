import { CookiesHelper } from "../helpers/cookies-helper";
import { subPublish } from "../helpers/state-manager";
import { HomePageModel } from "../home-page/model";
import { PaginationController } from "../pagination/controller";
import { TodoModel } from "./model";
import { TodoView } from "./view";

class TodoController {
    #view;
    #model;
    #selector;
    #todos = [];
    #cookieHeader;
    #paginationController;
    #pageC = 0;
    #currentPage = 1;
    #metaModel;

    constructor(selector) {
        this.#view = new TodoView(selector);
        this.#model = new TodoModel();
        this.#selector = selector;
        this.#cookieHeader = new CookiesHelper();
        this.#paginationController = new PaginationController(selector);
        this.#metaModel = new HomePageModel();

        subPublish.clear("page");
        subPublish.subscribe({
            event: "page",
            callback: () => this.#destroyEvents(),
        });

        subPublish.subscribe({
            event: `${selector}:currentPage-changed`,
            callback: (currentPage) => {
                this.#destroyEvents();
                this.#setCurrentPage(currentPage);
            },
        });
    }

    async #loadData() {
        this.pageC = Math.ceil(
            (await (await this.#metaModel.getMeta()).todoC) / 10
        );
        const id = this.#cookieHeader.get("_uid");
        const data = await this.#model.findById(id, this.#currentPage);
        this.#setTodos(data);

        subPublish.publish(`${this.#selector}:DOM-changed`, this.pageC);
    }

    #setTodos(data) {
        this.#todos = data;
        this.render();
    }

    render() {
        if (this.#todos.length > 0) {
            this.#view.render(this.#todos);
            this.#initEvents();
            return;
        }

        this.#view.templateLoader();
        this.#loadData();
    }

    #setCurrentPage(currentPage) {
        if (this.#currentPage !== currentPage) {
            this.#currentPage = currentPage;
            this.#view.templateLoader();
            this.#loadData();
        }
    }

    #initEvents() {
        console.log("Todo: initEvents");
    }

    #destroyEvents() {}
}

export { TodoController };
