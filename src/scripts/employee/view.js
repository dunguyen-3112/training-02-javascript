import { EmployeeModel } from "./model";
import { $ } from "../constant";
import { TemplateModalFormAddEmployees } from "./templates";

export default class EmployeeView {
    constructor(selector) {
        this.selector = selector;

        // this.formNew = document.formNewEmployee;
        // this.modalTitle = $(`.${employeeSelector} .modal-title`);
        // this.modalContainer = $(`.${employeeSelector} .modal-container`);
        // this.btn_close = $(`.${employeeSelector} .btn-close`);
        // this.btnSave = document.formNewEmployee.btnSave;
    }

    closeModal() {
        this.view.formNew.btnReset.click();
        this.view.formNew.removeAttribute("data-id");
        this.view.modalContainer.style.display = "none";
    }

    /**
     *
     * @param {string} title
     * @param {EmployeeModel} employee
     */
    openModal(title, employee) {
        this.modalTitle.innerHTML = title;
        this.modalContainer.style.display = "block";

        if (employee) {
            this.formNew.setAttribute("data-id", employee.id);
            this.formNew.name.value = employee.name;
            this.formNew.email.value = employee.email;
            this.formNew.phone.value = employee.phone;
            this.formNew.address.value = employee.address;
            this.formNew.status.value = employee.status ? "active" : "inactive";
            this.formNew.gender.value = employee.gender;
        }
    }
    renderRow({ employee, index, selectorTableEmployee }) {
        const tbody = $(selectorTableEmployee);
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
        try {
            const row = $(
                `.${employeeSelector} .table-body tr[data-id="${data.id}"]`
            );
            row.cells[1].innerHTML = data.name;
            row.cells[2].innerHTML = data.address;
            row.cells[3].innerHTML = ` <div class= '${
                data.status ? " active" : "inactive"
            }'></div>`;
        } catch (error) {
            console.log("Error: " + error.message);
        }
    }
}
