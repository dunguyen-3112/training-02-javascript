import { $, rootSelector } from "../constant";
import { subPublish } from "../helpers/state-manager";
import { PaginationView } from "./view";
class PaginationController {
    constructor(selector) {
        this.selector = selector;

        this.view = new PaginationView(selector);

        subPublish.subscribe(`${this.selector}:pagination-init`, () => {
            this.initEvents();
        });
        subPublish.subscribe(`${this.selector}:currentPage-changed`, () => {
            this.destroyEvents();
            subPublish.clear(this.selector, "currentPage-changed");
        });

        // eslint-disable-next-line no-undef
        localStorage.setItem(
            this.selector,
            JSON.stringify({
                events: ["redirect", "update", "create", "page-changed"],
            })
        );
    }

    setCurrentPage(currentPage) {
        this.destroyEvents();
        subPublish.publish(`${this.selector}:page-changed`, currentPage);

        this.view.template(this.pageC, currentPage);

        this.currentPage = currentPage;

        subPublish.publish(`${this.selector}:redirect`);
    }
    render() {}

    initEvents() {
        this.view.pagination = $(
            `${rootSelector} .${this.selector} .pagination`
        );
        this._initEventPagination = this.handleEventPagination.bind(this);
        this.view.pagination.addEventListener(
            "click",
            this._initEventPagination
        );
    }

    destroyEvents() {
        if (this._initEventPagination)
            this.view.pagination.removeEventListener(
                "click",
                this._initEventPagination
            );
    }
    handleEventPagination(e) {
        if (e.path[0].className.match("page")) {
            const page = parseInt(e.path[0].innerHTML);
            this.setCurrentPage(page);
        }
    }
}

export { PaginationController };
