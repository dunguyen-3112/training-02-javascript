import { $, rootSelector as root, rootSelector } from "../constant";
import { headerTableTodo } from "./templates";
class TodoView {
    constructor(selector) {
        this.selector = selector;
        const tam = $(`${rootSelector} .${selector}`);
        this.content = tam ? tam : document.createElement("div");
        this.content.className = this.selector;
        this.content.innerHTML = headerTableTodo;
        $(rootSelector).appendChild(this.content);
        this.btnClose = $(`${rootSelector} .${selector} .btn-close`);
        this.tbody = $(`${rootSelector} .${selector} tbody`);
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
