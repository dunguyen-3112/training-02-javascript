import { $, employeeSelector, rootSelector } from "../constant";
import { TemPlateHeaderTableEmployees } from "../template/employees";

export default class EmployeesView {
    constructor() {
        this.selector = employeeSelector;
        const elementSelector = document.createElement("div");
        elementSelector.classList.add(employeeSelector);
        elementSelector.innerHTML = TemPlateHeaderTableEmployees;
        $(`#${rootSelector}`).appendChild(elementSelector);

        this.formSearch = $(".form-search");
    }
    addRow(data) {
        const tbody = $(`.${employeeSelector} .table-body`);
        tbody.innerHTML += data;
        return tbody.lastChild;
    }
    rows() {
        return document.querySelectorAll(`.${employeeSelector} .table-body tr`);
    }

    numberRows() {
        return this.rows().length;
    }

    renderTable(rows) {
        $(`.${employeeSelector} tbody.table-body`).innerHTML = rows.join("");
    }
}
