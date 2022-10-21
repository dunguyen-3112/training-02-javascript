/* eslint-disable no-undef */
import { Employee, EmployeeModel } from "./model";
import EmployeeView from "./view";
import { Validator } from "../helpers/valid-helper";
import { $, rootSelector as root } from "../constant";
import { subPublish } from "../helpers/state-manager";

class EmployeeCtrl {
    #model;
    #employee;
    #view;
    #selector;
    #_handleClose;

    constructor(selector) {
        this.#selector = selector;
        this.#model = new EmployeeModel();
    }

    setEmployee(employee) {
        this.#employee = employee ? new Employee(employee) : {};
        const title =
            this.#employee instanceof Employee
                ? "Update Employee"
                : "New Employee";

        this.#view = new EmployeeView(this.#selector, title);

        this.#render();

        this.#initEvents();
    }

    #render() {
        this.#view.setModal(this.#employee);
    }

    #initEvents() {
        this.#initEventClose();

        Validator({
            rules: [
                Validator.isEmail("email"),
                Validator.minLength("name", 6),
                Validator.minLength("address", 8),
                Validator.isPhone("phone"),
            ],
            formGroupSelector: ".form-group",
            errorSelector: ".form-message",
            onSubmit: this.#handleSave.bind(this),
            form: `${root} .${this.#selector} form[name="form-employee"]`,
        });
    }

    #destroyEvents() {
        this.#view
            .getBtnClose()
            .removeEventListener("click", this._handleClose);
    }

    /**
     *
     * @param {Employee} data
     */
    async #handleSave(data) {
        data.gender = data.gender === "male";
        data.status = data.status === "active";
        delete data.btnSave;
        delete data.btnReset;

        this.#destroyEvents();
        this.#view.closeModal();

        if (data.id) {
            const employee = await this.#model.update(data);
            subPublish.publish("employees-page:update", employee);
        } else {
            const employee = await this.#model.create(data);
            subPublish.publish("employees-page:create", employee);
        }

        history.back();
    }

    #initEventClose() {
        this.#_handleClose = this.#handleClose.bind(this);
        this.#view.getBtnClose().addEventListener("click", this.#_handleClose);
    }

    #handleClose() {
        this.#destroyEvents();
        this.#view.closeModal();
        subPublish.publish("employees-page:redirect");
        history.back();
    }
}
export { EmployeeCtrl };
