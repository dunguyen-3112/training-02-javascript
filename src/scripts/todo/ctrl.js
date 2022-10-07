import { $ } from "../constant";
import { TodoModel } from "./model";
import { TodoView } from "./view";

class TodoCtrl {
    constructor(selector, employeeId) {
        this.uid = employeeId;
        this.view = new TodoView(selector);
        this.model = new TodoModel(employeeId);
    }

    async render() {
        const data = await this.model.findAll();
        this.view.render(data);
    }

    initEvents() {
        this.view.btnClose.addEventListener("click", () => {
            this.closeTodo();
        });
    }
    closeTodo() {
        this.view.close();
    }
}
export { TodoCtrl };
