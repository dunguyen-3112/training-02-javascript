/* eslint-disable no-undef */
import { $, rootSelector as root } from "../constant";
import { headerTableTodo } from "./templates";
class TodoView {
    constructor(selector) {
        this.selector = selector;
        const tam = $(`${root} .${selector}`);
        this.content = tam ? tam : document.createElement("section");
        this.content.className = this.selector;
        this.content.innerHTML = headerTableTodo;
        $(root).appendChild(this.content);
        this.btnClose = $(`${root} .${selector} .btn-close`);
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
    close() {
        this.content.remove();
    }
}
export { TodoView };
