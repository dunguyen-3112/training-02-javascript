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
    displayFormAdd(renderTable) {
        const handleSave = (input) => {
            if (this.model.validate(input))
                this.model.create(input).then((data) => {
                    this.view.form.btnReset.click();
                    this.view.form_add.style.display = "none";
                    renderTable();
                });
        };
        this.view.displayFormAdd(handleSave);
    }
    renderRow(value, index) {
        return this.view.renderRow(value, index);
    }

    handleBtnDelete(id) {
        return this.model.getById(id).then((data) => data.name);
    }
    handleDelete(id) {
        return this.model.deleteById(id).then((data) => data);
    }
    handleBtnUpdate(id) {
        return this.model.getById(id).then((data) => data);
    }
}