import { subPublish } from "../helpers/state-manager";
import { PaginationView } from "./view";
class PaginationController {
    #selector;
    #view;
    #_initEventPagination;
    #currentPage = 0;
    #pageC;

    constructor(selector) {
        this.#selector = selector;

        this.#view = new PaginationView(selector);

        subPublish.clear(`${this.#selector}:DOM`);
        subPublish.clear(`${this.#selector}:DOM-changed`);

        subPublish.subscribe({
            event: `${this.#selector}:DOM`,
            callback: () => this.#destroyEvents(),
        });

        subPublish.subscribe({
            event: `${this.#selector}:DOM-changed`,
            callback: (pageC) => {
                this.#setPageC(pageC);
            },
        });
    }

    #setPageC(pageC) {
        this.#initEvents();
        if (this.#pageC !== pageC) {
            this.#setCurrentPage(1, pageC);
        }
    }

    #setCurrentPage(currentPage, pageC) {
        if (this.#pageC !== pageC || this.#currentPage !== currentPage) {
            this.#pageC = pageC;
            this.#currentPage = currentPage;
            this.#render();
            subPublish.publish(
                `${this.#selector}:currentPage-changed`,
                currentPage
            );
        }
    }
    #render() {
        this.#view.template(this.#pageC, this.#currentPage);
    }

    #initEvents() {
        this.#_initEventPagination = this.#handleEventPagination.bind(this);
        this.#view
            .getPagination()
            .addEventListener("click", this.#_initEventPagination);
    }

    #destroyEvents() {
        if (this.#_initEventPagination)
            this.#view
                .getPagination()
                .removeEventListener("click", this.#_initEventPagination);
    }

    #handleEventPagination(e) {
        if (e.path[0].className.match("page")) {
            const page = parseInt(e.path[0].innerHTML);
            this.#destroyEvents();
            this.#setCurrentPage(page, this.#pageC);
        }
    }
}

export { PaginationController };
