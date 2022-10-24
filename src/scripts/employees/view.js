/* eslint-disable no-undef */
import { $, rootSelector as root } from "../constant";
import { TemPlateHeaderTableEmployee } from "./templates";

export default class EmployeesView {
    #selector;
    #tbody;

    /**
     * @param {string} selector
     */

    constructor(selector) {
        this.#selector = selector;

        $(root).innerHTML = `
                <section class="${this.#selector}">
                    ${TemPlateHeaderTableEmployee}
                </section>`;
    }

    getTbody() {
        return $(`${root} .${this.#selector} table.list-employee tbody`);
    }

    getFormSearch() {
        return $(`${root} .${this.#selector} .form-search`)["keyword"];
    }

    getBtnAdd() {
        return $(`${root} .${this.#selector} .btn-add`);
    }

    /**
     * @param {Array<Employee>} employees
     */

    template(employees) {
        const rows = employees.map((employee, index) =>
            this.#templateRow(employee, index)
        );

        this.getTbody().innerHTML = rows.join("");
    }

    templateLoader() {
        this.getTbody().innerHTML = '<div class="loader"></div>';
    }

    templateNotFound() {
        this.getTbody().innerHTML = "Not found data";
    }

    /**
     *
     * @param {Employee} employee
     * @param {int} index
     * @returns
     */
    #templateRow(employee, index) {
        "".localeCompare;
        return (
            `<tr data-id=${employee.id}>
                        <td>${index}</td>
                        <td><img src="${
                            !employee.avatar
                                ? "https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8="
                                : employee.avatar
                        }" alt="avatar"></td>
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
