/* eslint-disable no-undef */
import { $, rootSelector as root } from "../constant";
import { headerTableTodo } from "./templates";
class TodoView {
    constructor(selector) {
        this.selector = selector;
    }

    render(data) {
        if (!$(`${root} .${this.selector}`)) {
            $(root).innerHTML = `
                    <section class="${this.selector}">
                        ${headerTableTodo}
                    </section>`;
        }
        const tbody = $(`${root} .${this.selector} tbody`);
        tbody.innerHTML = "";
        const rows = data.map(
            (item, index) =>
                `
                    <tr>
                        <td>${index}</td>
                        <td>${item.title}</td>
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
