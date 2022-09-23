import { Employee } from "./model";
import { $ } from "../constant";
import { checkEmail, checkPhone, checkLength } from "../helpers/valid-helper";

export default class EmployeesView {
    constructor(selector) {
        this.selector = selector;
        $(`.${this.selector}`).innerHTML = this.renderHeaderTable();
        $(`.${this.selector}`).innerHTML += this.renderForm();
        this.tbody = $(".table-body");
        this.btnAdd = $(".btn-add");
        this.inputSearch = $(".control-search");
        this.form_add = $(".form-add-container");
        this.btn_close = $(".btn-close");
        this.form = document.form;
        this.formTitle = $(".form-title");
        this.formSearch = document.formSearch;
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
            await this.form[`${item}`].addEventListener(
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

    renderForm = () => `
        <div class="form-add-container">
        <button class="btn-close"></button>
        <form action="#" method="post" name="form" class="form-add">
            <title class="form-title">Add new Employee</title>
            <div class="form-content">
                <label class="form-2">
                    <span class="form-label">Name</span>
                    <input type="text" placeholder="Please type your name" name="name" class="form-control" required>
                    <span class="message">Valid address, minimum 6 characters!</span>
                </label>
                <label>
                    <span class="form-label">Gender</span>
                    <div class="form-group">
                        <div class="form-radio-option">
                            <span >Male</span>
                            <input type="radio"  name="gender" class="form-control" value="true" checked>
                        </div>
                        <div class="form-radio-option">
                            <span >FeMale</span>
                            <input type="radio"  name="gender" class="form-control" value="false">
                        </div>
                    </div>
                </label>
                <label>
                    <span class="form-label">Status</span>
                    <select name="status" class="form-control">
                        <option value="active">Active</option>
                        <option value="inactive">In Active</option>
                    </select>
                </label>
                <label class="form-2">
                    <span class="form-label">Address</span>
                    <input type="text" placeholder="Please type your address " name="address" class="form-control" required>
                    <span class="message">Valid address, minimum 6 characters!</span>
                </label>
                <label class="form-2">
                    <span class="form-label">Email</span>
                    <input type your="email"  placeholder="Please type your email  " name="email" class="form-control" required>
                    <span class="message">Valid email must include @!</span>
                </label>
                <label class="form-2">
                    <span class="form-label">Phone</span>
                    <input type="tel" placeholder="Please type your phone. Example: 123-123-1234" name="phone" class="form-control" required>
                    <span class="message">Valid phone number, minimum 10 characters amd sample Format.</span>
                </label>
            </div>
            <div class="form-action">
                <button type="reset" class="btn btn-dark" name="btnReset">Reset</button>
                <button type="submit" class="btn btn-dark" name="btnSave">Save</button>
            </div>
        </form>
        </div>
    `;

    renderHeaderTable = () => `
        <div class="flex">
            <form class="form-search" name="formSearch" action="#" method="post">
                <input type="text" class="control-search" name="keyword" placeholder="Search...">
                <button class="icon-search"></button>
            </form>
            <button class="btn btn-icon btn-add"> </button>
        </div>
        <table class="list-employee">
            <thead>
                <tr>
                    <th>Of</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody class="table-body">

            </tbody>
        </table>
    `;
}
