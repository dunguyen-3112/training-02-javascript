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
        }
        //this.todoCtrl.closeTodo();
        // if (action === "update") {
        //     this.view.openModal("Update employee", obj);
        //     this.initEventClose();
        // } else {
        //     this.keyAdd = obj;
        //     this.view.openModal("Add new employee");
        //     this.initEventClose();
        // }
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
    async handleBtnDelete(e) {
        const id = e.path[2].getAttribute("data-id");

        try {
            const data = await this.model.findById(id);
            if (
                data &&
                confirm(`You want to remove an employee "${data.name}"`)
            ) {
                try {
                    const d = await this.model.deleteById(id);
                    if (d != undefined) {
                        this.destroyEventDelete(e.path[2]);
                        this.destroyEventUpdate(e.path[2]);
                        const rows = e.path[3].rows,
                            len = rows.length,
                            index = e.path[2].rowIndex;
                        for (let i = index; i < len; i++) {
                            rows[i].cells[0].innerHTML = i - 1;
                        }
                        e.path[2].remove();
                    } else {
                        console.log(
                            "Error: ",
                            "Failed to internet connection..."
                        );
                    }
                } catch (error) {
                    throw error;
                }
            } else
                console.log(
                    "Couldn't findById or failed  to internet connection"
                );
        } catch (error) {
            console.log("Error: " + error.message);
        }
    }
    initEventClose() {
        console.log("initEventClose");
        this.view.btn_close.addEventListener(
            "click",
            this.view.closeModal.bind(this)
        );
    }
}
export { EmployeeCtrl };
