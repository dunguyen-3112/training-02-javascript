import EmployeesModel from "./model";
import EmployeesView from "./view";

export default class EmployeesCtrl {
    /**
     *
     * @param {EmployeesModel} model
     * @param {EmployeesView} view
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    run() {
        this.model.findAll().then((data) => {
            this.view.displayTable(data);
        });
        this.view.handle_btnAdd();
    }
}