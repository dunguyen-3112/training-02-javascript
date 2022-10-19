import { $, rootSelector as root } from "../constant";

class PaginationView {
    constructor(selector) {
        this.selector = selector;
        $(`${root} .${this.selector}`).innerHTML +=
            '<nav class="pagination"></nav>';
    }

    template(pageC, currentPage) {
        this.pageC = pageC;
        const t =
            currentPage <= 4
                ? 4
                : currentPage > this.pageC - 4
                ? this.pageC - 4
                : currentPage;
        const as =
            pageC > 7
                ? [
                      `<a class="page _1">1</a>`,
                      `<a class="page _${t - 2}">${t - 2}</a> `,
                      `<a class="page _${t - 1}">${t - 1}</a>`,
                      `<a class="page _${t}">${t}</a>`,
                      ` <a class="page _${t + 1}">${t + 1}</a>`,
                      `<a class="page _${t + 2}">${t + 2}</a>`,
                      `${
                          t + 3 >= this.pageC - 1
                              ? `<a class='page _${this.pageC - 1}'>${
                                    this.pageC - 1
                                }</a>`
                              : "<span class='point'>...</span>"
                      }`,
                      `<a class="page _${this.pageC}">${this.pageC}</a>`,
                  ]
                : Array.from(Array(pageC).keys()).map(
                      (page) => `<a class="page _${page + 1}">${page + 1}</a>`
                  );
        $(`${root} .${this.selector} nav.pagination`).innerHTML = as.join(" ");

        $(
            `${root} .${this.selector} nav.pagination a.page._${currentPage}`
        ).classList.add("selected");
    }
}

export { PaginationView };
