import { subPublish } from "../helpers/state-manager";
import { PaginationView } from "./view";
class PaginationController {
    #selector;
    #view;
    #_initEventPagination;
    #currentPage;
    #pageC;

    constructor(selector) {
        this.#selector = selector;

        this.#view = new PaginationView(selector);

        // initialize DOM success => initEvents
        subPublish.subscribe({
            event: `${this.#selector}:DOM`,
            callback: () => this.#initEvents(),
        });

        // DOM changing => destroyEvents
        subPublish.subscribe({
            event: `${this.#selector}:DOM-change`,
            callback: (pageC) => {
                if (Object.keys(pageC).length !== 0) {
                    this.#pageC = pageC.value;
                }
                this.#destroyEvents();
                if (this.#pageC === 0) {
                    this.#view.getPagination().innerHTML = "";
                }
            },
        });
    }

    setCurrentPage(currentPage) {
        this.#currentPage = currentPage;
        subPublish.publish(
            `${this.#selector}:currentPage-changed`,
            currentPage
        );

        this.#view.template(this.#pageC, currentPage);
        this.#initEvents();
        return;
    }
    render() {}

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
            this.setCurrentPage(page);
        }
    }
}

export { PaginationController };
