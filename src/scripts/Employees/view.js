import { Employee, EmployeeModel } from "../Employee/model";
import EmployeeCtrl from "../Employee/controller";
import EmployeeView from "../Employee/view";

export default class EmployeesView {
    constructor() {
            this.ctrl = new EmployeeCtrl(new EmployeeModel(), new EmployeeView());
            this.tbody = document.querySelector(".table-body");
            this.btnAdd = document.querySelector(".btn-add");
        }
        /**
         *
         * @param {...Array<Employee>} data
         */
    displayTable(data) {
        const rows = data.map((value, index) =>
            this.ctrl.renderRow(value, index)
        );
        this.tbody.innerHTML = rows.join("");
    }

    handle_btnAdd() {
        this.btnAdd.addEventListener("click", (e) => {
            console.log(this.ctrl.display_FormAdd());
        });
    }
}