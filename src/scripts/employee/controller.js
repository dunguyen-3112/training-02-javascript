import { EmployeeModel } from "./model";
import EmployeeView from "./view";
import { Validator } from "../helpers/valid-helper";
import { TodoCtrl } from "../todo/ctrl";
import { employeeTodoSelector, employeeSelector, $ } from "../constant";

export default class EmployeeCtrl {
    constructor() {
        this.view = new EmployeeView();

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
        this.todoCtrl = new TodoCtrl(employeeTodoSelector, employeeSelector);
    }

    render(action, obj, index) {
        if (action === "row") {
            return this.view.renderRow(index, obj);
        }
        this.todoCtrl.closeTodo();
        if (action === "update") {
            this.view.openModal("Update employee", obj);
            this.initEventClose();
        } else {
            this.keyAdd = obj;
            this.view.openModal("Add new employee");
            this.initEventClose();
        }
    }
    initEvents() {
        Validator.clear("formNewEmployee");
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
    initEventDelete(element) {
        console.log("initEventDelete");
        element
            .querySelectorAll("button")[0]
            .addEventListener("click", this.handleBtnDelete.bind(this));
    }

    destroyEventDelete(element) {
        console.log("destroyEventDelete");
        element
            .querySelectorAll("button")[0]
            .removeEventListener("click", this.handleBtnDelete);
    }

    destroyEventUpdate(element) {
        console.log("destroyEventUpdate");
        element
            .querySelectorAll("button")[1]
            .removeEventListener("click", this.handleBtnUpdate);
    }

    async handleSave(data) {
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
                this.keyAdd(data1);
            }
            this.view.btn_close.click();
        } catch (error) {
            throw error;
        }
    }
    async handleBtnUpdate(e) {
        const data = await this.model.findById(
            e.path[2].getAttribute("data-id")
        );
        this.render("update", data);
    }
    handleBtnDelete(e) {
        const id = e.path[2].getAttribute("data-id");

        this.model.findById(id).then(async (data) => {
            if (confirm(`You want to remove an employee "${data.name}"`)) {
                try {
                    await this.model.deleteById(id);
                    this.destroyEventDelete(e.path[2]);
                    this.destroyEventUpdate(e.path[2]);
                    e.path[2].remove();
                } catch (error) {
                    throw error;
                }
            }
        });
    }
    initEventClose() {
        console.log("initEventClose");
        this.view.btn_close.addEventListener(
            "click",
            this.view.closeModal.bind(this)
        );
    }
}
