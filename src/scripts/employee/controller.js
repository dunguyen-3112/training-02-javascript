import { EmployeeModel } from "./model";
import EmployeeView from "./view";
import { Validator } from "../helpers/valid-helper";
import { TodoCtrl } from "../todo/ctrl";
import { $, rootSelector } from "../constant";
import { selectorTableEmployee } from "../employees/constant";

class EmployeeCtrl {
    constructor(selector) {
        this.view = new EmployeeView(selector);
        const employee = {
            id: null,
            address: null,
            email: null,
            gender: null,
            name: null,
            phone: null,
            status: null,
        };
        this.model = new EmployeeModel(employee);
        //this.todoCtrl = new TodoCtrl(employeeTodoSelector, employeeSelector);
    }

    render(action, params) {
        if (action === "row") {
            this.view.renderRow(params);

            const row = $(
                `${params.selectorTableEmployee} tr[data-id="${params.employee.id}"]`
            );
            //this.initEventDelete(row);
        } else if (action === "new") {
            Object.assign(this, params);
            this.view.openModal("Add new employee", params);
            this.initEvents();
        } else if (action === "update") {
            this.view.openModal("Update employee", params.employee);
            this.initEvents();
        } else {
            console.log("Chua xu ly");
        }
    }
    initEvents() {
        this.initEventClose();
        // Validator.clear("formNewEmployee");
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
            form: "formNewEmployee",
        });
    }

    initEventTodo(element) {
        console.log("initEventTodo");
        element.addEventListener("dblclick", () => {
            this.todoCtrl.render(element.getAttribute("data-id"));
        });
    }

    initEventUpdate(element) {
        console.log("initEventUpdate");
        element
            .querySelectorAll("button")[1]
            .addEventListener("click", this.handleBtnUpdate.bind(this));
    }

    destroyEvents() {}

    destroyEventUpdate(element) {
        console.log("destroyEventUpdate");
        element
            .querySelectorAll("button")[1]
            .removeEventListener("click", this.handleBtnUpdate);
    }

    async handleSave(data) {
        console.log(this.initEvents);

        try {
            data.gender = data.gender === "true";
            data.status = data.status === "active";
            delete data.btnSave;
            delete data.btnReset;
            if (data.id) {
                this.view.updateRow(data);
                const data1 = await this.model.update(data);
            } else {
                const data1 = await this.model.create(data);

                this.view.renderRow({
                    employee: data1,
                    index: this.index,
                    selectorTableEmployee: this.selectorTableEmployee,
                });
                this._initEvents();
            }
            this.view.content.remove();
        } catch (error) {
            console.log("Error: " + error);
            //throw error;
        }
    }
    async handleBtnUpdate(e) {
        try {
            const data = await this.model.findById(
                e.path[2].getAttribute("data-id")
            );
            if (data) this.render("update", data);
            else
                console.log(
                    "Error: ",
                    "Not Found Employee By Id or failed to internet connection"
                );
        } catch (error) {
            console.log("Error: " + error.message);
        }
    }

    initEventClose() {
        console.log("initEventClose");
        $(
            `${rootSelector} .${this.view.selector} button.btn-close`
        ).addEventListener("click", (e) => this.view.content.remove());
    }
}
export { EmployeeCtrl };
