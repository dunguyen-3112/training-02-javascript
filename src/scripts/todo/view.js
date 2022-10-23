/* eslint-disable no-undef */
import { $, rootSelector as root } from "../constant";
import { headerTableTodo } from "./templates";

class TodoView {
    #selector;
    constructor(selector) {
        this.#selector = selector;
        $(root).innerHTML = `
                <section class="${selector}">
                    ${headerTableTodo}
                </section>`;
    }

    templateLoader() {
        this.getTbody().innerHTML = '<div class="loader"></div>';
    }

    getTbody() {
        return $(`${root} .${this.#selector} table.list-todo tbody`);
    }

    render(data) {
        const tbody = this.getTbody();
        tbody.innerHTML = "";
        const rows = data.map(
            (item, index) =>
                `
                    <tr>
                        <td>${index}</td>
                        <td>${item.name}</td>
                        <td>${item.date}</td>
                        <td>
                            <div class=` +
                `${item.status ? " active" : "inactive"}>
                            </div>
                        </td>
                    </tr>
                `
        );
        tbody.innerHTML = rows.join("");
    }
}
export { TodoView };
