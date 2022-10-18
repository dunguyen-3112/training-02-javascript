/* eslint-disable no-undef */
import { $, rootSelector as root } from "../constant";
import { TemPlateHeaderTableEmployee } from "./templates";

export default class EmployeesView {
    /**
     * @param {string} selector
     */

    constructor(selector) {
        this.selector = selector;

        $(root).innerHTML = `
                <section class="${this.selector}">
                    ${TemPlateHeaderTableEmployee}
                </section>`;
    }

    /**
     * @param {Array<Employee>} employees
     */

    template(employees) {
        const tbody = $(`${root} .${this.selector} table.list-employee tbody`);
        if (employees) {
            tbody.innerHTML = "";
            const rows = employees.map((employee, index) =>
                this.templateRow(employee, index)
            );
            tbody.innerHTML = rows.join("");
        } else tbody.innerHTML = '<div class="loader"></div>';
    }

    /**
     *
     * @param {Employee} employee
     * @param {int} index
     * @returns
     */
    templateRow(employee, index) {
        return (
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
                    </tr>`
        );
    }
}
