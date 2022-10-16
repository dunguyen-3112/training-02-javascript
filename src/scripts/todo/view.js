/* eslint-disable no-undef */
import { $, rootSelector as root } from "../constant";
import { headerTableTodo } from "./templates";
class TodoView {
    constructor(selector) {
        this.selector = selector;
        $(root).innerHTML = `<section class="${selector}"></section>`;
        $(`${root} .${selector}`).innerHTML = headerTableTodo;
        this.tbody = $(`${root} .${selector} tbody`);
    }
    render(data) {
        this.tbody.innerHTML = "";
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
        this.tbody.innerHTML = rows.join("");
    }
}
export { TodoView };
