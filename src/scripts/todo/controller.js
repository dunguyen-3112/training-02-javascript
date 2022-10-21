import { CookiesHelper } from "../helpers/cookies-helper";
import { subPublish } from "../helpers/state-manager";
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
    #currentPage;

    constructor(selector) {
        this.#view = new TodoView(selector);
        this.#model = new TodoModel();
        this.#selector = selector;
        this.#cookieHeader = new CookiesHelper();
        this.#paginationController = new PaginationController(selector);

        subPublish.subscribe({
            event: "todo-page",
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
        const id = this.#cookieHeader.get("_uid");
        const data = await this.#model.findById(id);
        this.#setData(data);
    }

    #setData(data) {
        this.#todos = data;
        this.render();
        this.#initEvents();
    }

    render() {
        if (this.#todos.length > 0) {
            const pageC = Math.ceil(this.#todos.length / 10);
            subPublish.publish(`${this.#selector}:DOM-change`, {
                value: pageC,
            });
            this.#paginationController.setCurrentPage(1);
            this.#setCurrentPage(1);
            return;
        }
        this.#loadData();
    }

    #setCurrentPage(currentPage) {
        this.#currentPage = currentPage;

        this.#view.render(
            this.#todos.slice((currentPage - 1) * 10, currentPage * 10)
        );
    }

    #initEvents() {}

    #destroyEvents() {}
}

export { TodoController };
