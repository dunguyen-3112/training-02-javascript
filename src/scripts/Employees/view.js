import { $, rootSelector } from "../constant";

import { TemPlateHeaderTableEmployee } from "./templates";

export default class EmployeesView {
    constructor(selector, selectorTableEmployee) {
        this.selector = selector;

        this.content = document.createElement("div");
        this.content.classList.add(`${selector}`);
        this.content.innerHTML = TemPlateHeaderTableEmployee(
            selectorTableEmployee
        );
        $(rootSelector).appendChild(this.content);
    }

    renderBtnNew() {
        this.content.innerHTML +=
            '<button class="btn btn-icon btn-add"> </button>';
    }
    addRow(data) {
        const tbody = $(`.${employeeSelector} .table-body`);
        tbody.innerHTML += data;
        return tbody.lastChild;
    }
    rows(selectorTable) {
        return this.content.querySelectorAll(`table.${selectorTable} tr`);
    }

    numberRows() {
        return this.rows().length;
    }
}
