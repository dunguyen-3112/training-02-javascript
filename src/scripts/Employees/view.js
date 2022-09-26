import { EmployeesModel } from "./model";
import { $ } from "../constant";
import { checkEmail, checkPhone, checkLength } from "../helpers/valid-helper";
import {
    TemPlateHeaderTableEmployees,
    TemplateModalFormAddEmployees,
} from "../template/employees";

export default class EmployeesView {
    constructor(rootSelector) {
        this.rootSelector = rootSelector;
        const selector = document.createElement("div");
        selector.classList.add(rootSelector);
        selector.innerHTML = TemPlateHeaderTableEmployees;
        selector.innerHTML += TemplateModalFormAddEmployees;
        $("#root").appendChild(selector);
        this.tbody = $(".employees .list-employee tbody");
        this.btnModalNew = $(".employees div .btn-add");
        this.formSearch = $(".employees .form-search");
        this.formNew = document.formNewEmployee;
        this.modalTitle = $(".employees .modal-title");
        this.modalContainer = $(".employees .modal-container");
        this.btn_close = $(".employees .btn-close");
    }

    /**
     *
     * @param {Array<Employee>} employees
     */
    renderTable(employees) {
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

        this.tbody.innerHTML = rows.join("");
    }

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
     * @param {Employee} employee
     */
    openModal(title, employee) {
        this.modalTitle.innerHTML = title;
        this.modalContainer.style.display = "block";
        this.btn_close.addEventListener("click", (e) => {
            this.closeModal();
        });
        if (employee) {
            this.formNew.setAttribute("data-id", employee.id);
            this.formNew.name.value = employee.name;
            this.formNew.email.value = employee.email;
            this.formNew.phone.value = employee.phone;
            this.formNew.address.value = employee.address;
            this.formNew.status.value = employee.status ? "active" : "inactive";
            this.formNew.gender.value = employee.gender;
        }

        this.validate();
    }

    direstValid(e) {
        if (e.target) e = e.target;
        let message = e.parentElement.querySelector(".message"),
            value = e.value.trim();
        if (e.name == "email") {
            if (!checkEmail(value)) message.style.display = "block";
            else message.style.display = "none";
        }
        if (e.name == "phone") {
            if (!checkPhone(value)) message.style.display = "block";
            else message.style.display = "none";
        } else {
            if (!checkLength(value, 6)) message.style.display = "block";
            else message.style.display = "none";
        }
    }

    validate() {
        let props = ["name", "phone", "address", "email"];
        props.map(async (item) => {
            await this.formNew[`${item}`].addEventListener(
                "blur",
                this.direstValid
            );
        });
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
        let props = ["name", "phone", "address", "email"];
        props.map((item) => {
            this.direstValid(this.form[`${item}`]);
        });
        let ch = Array.from(document.querySelectorAll(".message")).every(
            (item, index) => {
                return item.style.display == "" || item.style.display == "none";
            }
        );
        if (!ch) return null;
        else {
            this.closeModal();
            return body;
        }
    }

    destroyValidateForm() {
        let props = ["name", "phone", "address", "email"];
        props.map(async (item) => {
            this.form[item].parentElement.querySelector(
                ".message"
            ).style.display = "none";
            await this.form[`${item}`].removeEventListener(
                "blur",
                this.direstValid
            );
        });
    }
}
