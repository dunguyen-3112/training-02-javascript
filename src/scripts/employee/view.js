import { EmployeeModel } from "./model";
import { $, rootSelector } from "../constant";
import { TemplateModalFormAddEmployees } from "./templates";
import { NAME_FORM } from "./constant";

export default class EmployeeView {
    constructor(selector) {
        this.selector = selector;
    }

    /**
     *
     * @param {string} title
     * @param {EmployeeModel} employee
     */
    openModal(title, employee) {
        this.content = document.createElement("div");
        this.content.classList.add(this.selector);
        $(rootSelector).appendChild(this.content);
        this.content.innerHTML = TemplateModalFormAddEmployees(NAME_FORM);
        this.btnClose = $(`${rootSelector} .${this.selector} button.btn-close`);
        this.form = $(
            `${rootSelector} .${this.selector} form[name="${NAME_FORM}"]`
        );
        this.content.querySelector(".modal-title").innerHTML = title;
        this.content.querySelector(".modal-container").style.display = "block";

        if (employee) {
            this.form.setAttribute("data-id", employee.id);
            this.form.name.value = employee.name;
            this.form.email.value = employee.email;
            this.form.phone.value = employee.phone;
            this.form.address.value = employee.address;
            this.form.status.value = employee.status ? "active" : "inactive";
            this.form.gender.value = employee.gender;
        }
    }
}
