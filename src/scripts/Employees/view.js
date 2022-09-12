import { Employee, EmployeeModel } from "../Employee/model";

export default class EmployeesView {
    constructor() {
            console.log("init");
            this.tbody = document.querySelector(".table-body");
            this.btnAdd = document.querySelector(".btn-add");
            this.inputSearch = document.querySelector(".control-search");
        }
        /**
         *
         * @param {Array<Employee>} data
         * @param {function} renderRow
         */
    displayTable(data, renderRow, handleBtnDelete, handleBtnUpdate) {
        const rows = data.map((value, index) => renderRow(value, index));
        this.tbody.innerHTML = rows.join("");
        for (let i = 0; i < data.length; i++) {
            let element = document.querySelector(`.row-${i}`);
            element
                .querySelectorAll("button")[1]
                .addEventListener("click", (e) => {
                    handleBtnDelete(data[i].id);
                });
            element
                .querySelectorAll("button")[0]
                .addEventListener("click", (e) => {
                    handleBtnUpdate(data[i].id);
                });
        }
    }

    handle_btnAdd(displayFormAdd) {
        this.btnAdd.addEventListener("click", (e) => {
            displayFormAdd();
        });
    }
}