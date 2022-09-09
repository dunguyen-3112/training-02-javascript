import EmployeesCtrl from "../Employees/controller";
import { EmployeeModel } from "./model";
import EmployeeView from "./view";

export default class EmployeeCtrl {
    /**
     *
     * @param {EmployeeModel} model
     * @param {EmployeeView} view
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
    display_FormAdd() {
        this.view.display_FormAdd();
        this.view.form.btnSave.addEventListener("click", (e) => {
            e.preventDefault();
            const input = {
                name: document.form.name.value,
                phone: document.form.phone.value,
                address: document.form.address.value,
                email: document.form.email.value,
                status: document.form.status.value === "active" ? true : false,
                gender: document.form.gender.value,
            };
            if (this.model.validate(input))
                this.model.create(input).then((data) => {
                    this.view.form.btnReset.click();
                    this.view.form_add.style.display = "none";
                });
        });
    }
    renderRow(value, index) {
        return this.view.renderRow(value, index);
    }
}