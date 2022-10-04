import { $ } from "../constant";
import { TodoModel } from "./model";
import { TodoView } from "./view";

class TodoCtrl {
    constructor(employeeTodoSelector, employeeSelector) {
        this.view = new TodoView(employeeTodoSelector, employeeSelector);

        this.model = new TodoModel();
    }

    async render(uid) {
        const data = await this.model.findAllByUid(uid);
        this.view.render(data);
        this.initEvents();
    }

    initEvents() {
        $(".employee-todo .btn-close").addEventListener("click", () => {
            this.closeTodo();
        });
    }
    closeTodo() {
        $(".employee-todo").style.display = "none";
    }
}
export { TodoCtrl };
