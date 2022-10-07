import { EmployeeModel } from "./model";
import EmployeeView from "./view";
import { Validator } from "../helpers/valid-helper";
import { TodoCtrl } from "../todo/ctrl";
import { $, rootSelector } from "../constant";

class EmployeeCtrl {
    constructor(selector) {
        this.view = new EmployeeView(selector);
        this.model = new EmployeeModel({
            id: null,
            address: null,
            email: null,
            gender: null,
            name: null,
            phone: null,
            status: null,
        });
        //this.todoCtrl = new TodoCtrl(employeeTodoSelector, employeeSelector);
    }

    render(action, params) {
        if (action === "new") {
            this.ctrl = params;
            this.view.openModal("Add new employee");
            this.initEvents();
        } else if (action === "update") {
            this.ctrl = params.ctrl;
            this.view.openModal("Update employee", params.employee);
            this.initEvents();
        } else {
            console.log("Chua xu ly");
        }
    }
    initEvents() {
        this.initEventClose();
        Validator({
            rules: [
                Validator.isEmail("email", "Trường này phải là Email!"),
                Validator.minLength("name", 6),
                Validator.minLength("address", 8),
                Validator.isPhone(
                    "phone",
                    "Trường này phải là Phone. Gồm 9 số nguyên!"
                ),
            ],
            formGroupSelector: ".form-group",
            errorSelector: ".form-message",
            onSubmit: this.handleSave.bind(this),
            form: "form",
        });
    }

    initEventTodo(element) {
        console.log("initEventTodo");
        element.addEventListener("dblclick", () => {
            this.todoCtrl.render(element.getAttribute("data-id"));
        });
    }

    destroyEvents() {}

    async handleSave(data) {
        data.gender = data.gender === "true";
        data.status = data.status === "active";
        delete data.btnSave;
        delete data.btnReset;
        if (data.id) {
            this.ctrl.updateRow({ employee: data });
            const data1 = await this.model.update(data);
        } else {
            const data1 = await this.model.create(data);
            this.ctrl.renderRow({ employee: data1 });
        }
        this.ctrl.initEvents();
        this.view.content.remove();
    }

    initEventClose() {
        console.log("initEventClose");
        this.view.btnClose.addEventListener("click", (e) => {
            this.ctrl.initEvents();
            this.view.content.remove();
        });
    }
}
export { EmployeeCtrl };
