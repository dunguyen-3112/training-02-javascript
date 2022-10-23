/* eslint-disable no-undef */
import { Employee, EmployeeModel } from "./model";
import EmployeeView from "./view";
import { Validator } from "../helpers/valid-helper";
import { $, rootSelector as root } from "../constant";
import { subPublish } from "../helpers/state-manager";
import { HomePageModel } from "../home-page/model";

class EmployeeCtrl {
    #model;
    #employee;
    #view;
    #selector;
    #_handleClose;
    #id;
    #metaModel;

    constructor(selector, id) {
        this.#selector = selector;
        this.#model = new EmployeeModel();
        const title = id ? "Update Employee" : "New Employee";
        this.#view = new EmployeeView(this.#selector, title);
        this.#id = id;
        this.#metaModel = new HomePageModel();
    }

    async #loadData() {
        const employee = await this.#model.findById(this.#id);
        this.#setEmployee(employee);
    }
    #setEmployee(employee) {
        this.#employee = new Employee(employee);
        this.render();
        this.#initEvents();
    }

    render() {
        if (!this.#id) {
            this.#view.openModal("Add new employee");
            this.#initEvents();
            return;
        } else if (!this.#employee) {
            this.#view.templateLoader();
            this.#loadData();
            return;
        }

        this.#view.openModal("Update employee", this.#employee);
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
        data.status = data.status === "active";
        delete data.btnSave;
        delete data.btnReset;

        this.#destroyEvents();
        this.#view.closeModal();
        try {
            if (this.#id) {
                if (!this.#employee.isChanged(new Employee(data))) {
                    data.id = parseInt(this.#id);
                    const employee = await this.#model.update(data);
                    subPublish.publish("employees-page:update", employee);
                    return;
                }
                subPublish.publish("employees-page:init");
            } else {
                const employee = await this.#model.create(data);
                await this.#metaModel.update("employees", 1);
                subPublish.publish("employees-page:create", employee);
            }
        } catch (error) {
            console.log(error);
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
        subPublish.publish("employees-page:init");
        history.back();
    }
}
export { EmployeeCtrl };
