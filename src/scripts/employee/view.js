import { EmployeeModel } from "./model";
import { $, employeeSelector } from "../constant";
import { checkEmail, checkPhone, checkLength } from "../helpers/valid-helper";
import { TemplateModalFormAddEmployees } from "../template/employees";

export default class EmployeeView {
    constructor() {
        const selector = $(`.${employeeSelector}`);
        selector.innerHTML += TemplateModalFormAddEmployees;
        this.formNew = document.formNewEmployee;
        this.modalTitle = $(".employees .modal-title");
        this.modalContainer = $(".employees .modal-container");
        this.btn_close = $(".employees .btn-close");
        this.btnSave = document.formNewEmployee.btnSave;
    }

    closeModal() {
        //this.destroyValidateForm();
        this.formNew.btnReset.click();
        this.modalContainer.style.display = "none";
        if (this.formNew.getAttribute("data-id"))
            this.formNew.removeAttribute("data-id");
    }

    /**
     *
     * @param {string} title
     * @param {EmployeeModel} employee
     */
    openModal(title, employee) {
        this.modalTitle.innerHTML = title;
        this.modalContainer.style.display = "block";
        this.btn_close.addEventListener("click", (e) => {
            this.closeModal();
        });
        if (employee) {
            this.form.setAttribute("data-id", employee.id);
            document.form.name.value = employee.name;
            document.form.email.value = employee.email;
            document.form.phone.value = employee.phone;
            document.form.address.value = employee.address;
            document.form.status.value = employee.status
                ? "active"
                : "inactive";
            document.form.gender.value = employee.gender;
        }
    }

    handleSubmit() {
        const body = {
            name: this.form.name.value,
            phone: this.form.phone.value,
            address: this.form.address.value,
            email: this.form.email.value,
            status: this.form.status.value === "active" ? true : false,
            gender: this.form.gender.value,
            id: this.form.getAttribute("data-id")
                ? this.form.getAttribute("data-id")
                : null,
        };

        return body;
    }
}
