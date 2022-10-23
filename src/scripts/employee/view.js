/* eslint-disable no-undef */
import { $, rootSelector as root } from "../constant";
import { TemplateModalFormAddEmployees } from "./templates";
import { Employee } from "./model";

export default class EmployeeView {
    #selector;

    constructor(selector) {
        this.#selector = selector;
    }

    getBtnClose = () => $(`${root} .${this.#selector} button.btn-close`);

    closeModal() {
        $(`${root} .${this.#selector}`).remove();
    }
    templateLoader() {}

    /**
     *
     * @param {String} title
     * @param {Employee} employee
     */
    openModal(title, employee) {
        $(root).innerHTML += `
                <section class="${this.#selector}">
                    ${TemplateModalFormAddEmployees(
                        title,
                        employee ? employee : undefined
                    )}
                </section>`;
    }
}
