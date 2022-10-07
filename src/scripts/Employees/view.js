import { $, rootSelector } from "../constant";
import { TemPlateHeaderTableEmployee } from "./templates";

export default class EmployeesView {
    constructor(selector, selectorTable) {
        this.selector = selector;
        this.selectorTable = selectorTable;
        this.content = document.createElement("div");
        this.content.classList.add(`${selector}`);
        this.content.innerHTML = TemPlateHeaderTableEmployee(selectorTable);
        $(rootSelector).appendChild(this.content);
        this.btnAdd = $(`${rootSelector} .${this.selector} .btn-add`);
    }

    rows() {
        return document.querySelectorAll(
            `${rootSelector} .${this.selector} table.${this.selectorTable} tbody tr`
        );
    }

    numberRows() {
        return this.rows().length;
    }
    renderRow({ employee, index }) {
        const tbody = $(
            `${rootSelector} .${this.selector} table.${this.selectorTable} tbody`
        );

        if (index === undefined) {
            index = this.numberRows();
        }
        tbody.innerHTML +=
            `<tr data-id=${employee.id}>
                        <td>${index}</td>
                        <td>${employee.name}</td>
                        <td>${employee.address}</td>
                        <td>
                            <div class=` +
            `${employee.status ? " active" : "inactive"}>
                            </div>
                        </td>
                        <td>
                            <button class="btn-delete btn btn-icon btn-delete"> </button>
                            <button class="btn-update btn btn-icon btn-update"></button>
                        </td>
                    </tr>`;
    }
    updateRow(data) {
        const row = $(
            `${rootSelector} .${this.selector} table.${this.selectorTable} tbody tr[data-id="${data.id}"]`
        );
        row.cells[1].innerHTML = data.name;
        row.cells[2].innerHTML = data.address;
        row.cells[3].innerHTML = ` <div class= '${
            data.status ? " active" : "inactive"
        }'></div>`;
    }
}
