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
        const rows = employees.map((employee, index) =>
            this.templateRow(employee, index)
        );

        this.tbody.innerHTML = rows.join("");
    }

    templateLoader() {
        this.tbody = $(`${root} .${this.selector} table.list-employee tbody`);
        this.tbody.innerHTML = '<div class="loader"></div>';
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
                            <button class="btn-delete btn btn-icon"> </button>
                            <button class="btn-update btn btn-icon"></button>
                        </td>
                    </tr>`
        );
    }
}
