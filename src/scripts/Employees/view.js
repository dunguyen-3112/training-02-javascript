import { $, employeeSelector } from "../constant";
import { TemPlateHeaderTableEmployees } from "../template/employees";

export default class EmployeesView {
    constructor() {
        this.selector = employeeSelector;
        const selector = document.createElement("div");
        selector.classList.add(employeeSelector);
        selector.innerHTML = TemPlateHeaderTableEmployees;

        $("#root").appendChild(selector);
    }

    /**
     *
     * @param {Array<Employee>} employees
     */
    renderTable(employees) {
        console.log(employees);
        const rows = employees.map(
            (employee, index) =>
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
        $(".employees .list-employee tbody.table-body").innerHTML =
            rows.join("");
    }
}
