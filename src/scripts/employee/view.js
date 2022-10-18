/* eslint-disable no-undef */
import { $, rootSelector as root } from "../constant";
import { TemplateModalFormAddEmployees } from "./templates";
import { Employee } from "./model";

export default class EmployeeView {
    constructor(selector, title) {
        this.selector = selector;

        $(root).innerHTML += `
                <section class="${selector}">
                    ${TemplateModalFormAddEmployees(title)}
                </section>`;
    }

    closeModal() {
        $(`${root} .${this.selector}`).remove();
    }

    /**
     *
     * @param {String} title
     * @param {Employee} employee
     */
    setModal(employee) {
        const form = $(`${root} .${this.selector} form[name='form-employee']`);

        if (employee instanceof Employee) {
            form.setAttribute("data-id", employee.id);
            form.name.value = employee.name;
            form.email.value = employee.email;
            form.phone.value = employee.phone;
            form.address.value = employee.address;
            form.status.value = employee.status ? "active" : "inactive";
            form.gender.value = employee.gender;
        }
    }
}
