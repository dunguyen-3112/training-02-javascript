import { API_BASE } from "../constant";
import API_Helper from "../helpers/api-helper";
import { CookiesHelper } from "../helpers/cookies-helper";

class HomePageModel {
    #API_Helper;
    #cookieHeader;
    constructor() {
        this.#API_Helper = new API_Helper();
        this.#cookieHeader = new CookiesHelper();
    }

    async getMeta() {
        const id = this.#cookieHeader.get("_uid");
        const meta = await this.#API_Helper.fetchAPI({
            url: `${API_BASE}/meta`,
        });
        return {
            employeeC: meta.employees.length,
            todoC: meta.users.todos[id],
        };
    }
    async update(attr, options) {
        if (options !== 1 && options !== -1) {
            const err = new Error("ERROR: Invalid options!");
            throw err;
        }

        const id = this.#cookieHeader.get("_uid");

        const meta = await this.#API_Helper.fetchAPI({
            url: `${API_BASE}/meta`,
        });

        const c =
            attr.localeCompare("todo") === 0
                ? parseInt(meta.users.todos[id]) + options
                : parseInt(meta.employees.length) + options;

        attr.localeCompare("todo") === 0
            ? (meta.users.todos[id] = c)
            : (meta.employees.length = c);

        await this.#API_Helper.fetchAPI({
            url: `${API_BASE}/meta`,
            method: "PUT",
            data: meta,
        });
    }
}

export { HomePageModel };
