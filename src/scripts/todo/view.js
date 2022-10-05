import { $, rootSelector as root } from "../constant";
import { headerTableTodo } from "./templates";
class TodoView {
    constructor(employeeTodoSelector, employeeSelector) {
        this.employeeSelector = employeeSelector;
        this.employeeTodoSelectors = employeeTodoSelector;
        const rootElement = $(`.${this.employeeSelector}`);
        const content = document.createElement("div");
        content.className = this.employeeTodoSelectors;

        content.innerHTML = headerTableTodo;
        rootElement.appendChild(content);
    }
    render(data) {
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

        $(
            `.${this.employeeSelector} .${this.employeeTodoSelectors} tbody`
        ).innerHTML = rows.join("");
        $(
            `.${this.employeeSelector} .${this.employeeTodoSelectors} `
        ).style.display = "block";
    }
}
export { TodoView };
