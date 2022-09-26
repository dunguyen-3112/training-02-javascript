import { EmployeeModel } from "./model";
import { $ } from "../constant";
import { checkEmail, checkPhone, checkLength } from "../helpers/valid-helper";

export default class EmployeeView {
    constructor(rootSelector) {}

    closeModal() {
        this.destroyValidateForm();
        document.form.btnReset.click();
        this.form_add.style.display = "none";
        if (this.form.getAttribute("data-id"))
            this.form.removeAttribute("data-id");
    }

    /**
     *
     * @param {string} title
     * @param {EmployeeModel} employee
     */
    openModal(title, employee) {
        this.formTitle.innerHTML = title;
        this.form_add.style.display = "block";
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
