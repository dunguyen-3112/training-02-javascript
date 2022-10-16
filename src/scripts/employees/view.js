/* eslint-disable no-undef */
import { $, rootSelector as root } from "../constant";
import { TemPlateHeaderTableEmployee } from "./templates";

export default class EmployeesView {
    constructor(selector, selectorTable) {
        this.selector = selector;
        this.selectorTable = selectorTable;
        $(root).innerHTML = `<section class="${this.selector}"></section>`;
        $(`${root} .${selector}`).innerHTML =
            TemPlateHeaderTableEmployee(selectorTable);
        this.btnAdd = $(`${root} .${this.selector} .btn-add`);
        this.formSearch = $(`${root} .${this.selector} .form-search`);
        this.tbody = $(
            `${root} .${this.selector} table.${this.selectorTable} tbody`
        );
    }

    rows() {
        return this.tbody.querySelectorAll("tr");
    }

    numberRows() {
        return this.rows().length;
    }
    renderList(employees) {
        this.tbody.innerHTML = "";
        employees.forEach((employee, index) => {
            this.renderRow({ employee, index });
        });
    }

    renderRow({ employee, index }) {
        const tbody = $(
            `${root} .${this.selector} table.${this.selectorTable} tbody`
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
