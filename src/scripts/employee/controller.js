import { Employee, EmployeeModel } from "./model";
import EmployeeView from "./view";
import { Validator } from "../helpers/valid-helper";
import { rootSelector } from "../constant";
import { subPublish } from "../helpers/state-manager";

class EmployeeCtrl {
    constructor(selector) {
        this.view = new EmployeeView(selector);
        this.model = new EmployeeModel();
    }

    setEmployee(employee) {
        this.employee = employee ? new Employee(employee) : {};
        this.render();
        this.initEvents();
    }

    render() {
        let title = "";
        if (this.employee instanceof Employee) title = "Update Employee";
        else title = "New Employee";
        this.view.openModal(title, this.employee);
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
            form: `${rootSelector} .${this.view.selector} form[name="form"]`,
        });
    }

    destroyEvents() {}

    async handleSave(data) {
        data.gender = data.gender === "male";
        data.status = data.status === "active";
        delete data.btnSave;
        delete data.btnReset;
        if (data.id) {
            console.log("update");
            const employee = await this.model.update(data);
            subPublish.publish("update", employee);
        } else {
            console.log("create");
            const employee = await this.model.create(data);
            subPublish.publish("create", employee);
        }
        this.view.content.remove();
    }

    initEventClose() {
        this.view.btnClose.addEventListener("click", () => {
            this.view.content.remove();
            subPublish.publish("close");
        });
    }
}
export { EmployeeCtrl };
