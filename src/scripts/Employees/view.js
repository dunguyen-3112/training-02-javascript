import { Employee } from "./model";

export default class EmployeesView {
    constructor() {
        this.tbody = document.querySelector(".table-body");
        this.btnAdd = document.querySelector(".btn-add");
        this.inputSearch = document.querySelector(".control-search");
        this.form_add = document.querySelector(".form-add-container");
        this.btn_close = document.querySelector(".btn-close");
        this.form = document.form;
        this.formTitle = document.querySelector(".form-title");
    }
    /**
     *
     * @param {Employee} employee
     * @param {int} index
     */
    renderRow = (employee, index) =>
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
                <img src="./images/icon.png" alt="">
                    <button class="btn btn-warning"> </button>
                    <button class="btn btn-danger">Delete</button>
                </td>
            </tr>`;
    /**
     *
     * @param {Array<Employee>} employees
     */
    renderTable(employees) {
        const rows = employees.map((value, index) =>
            this.renderRow(value, index)
        );
        this.tbody.innerHTML = rows.join("");
    }

    closeModal() {
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
            this.form.setAttribute("data-id", data.id);
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
            name: document.form.name.value,
            phone: document.form.phone.value,
            address: document.form.address.value,
            email: document.form.email.value,
            status: document.form.status.value === "active" ? true : false,
            gender: document.form.gender.value,
            id: this.form.getAttribute("data-id")
                ? this.form.getAttribute("data-id")
                : null,
        };
        this.closeModal();
        return body;
    }

    // validateForm() {
    //     // this.form.name.addEventListener("blur", (e) => {
    //     //     if (e.target.value.length < 6) {
    //     //         document.querySelector(".message").style.display = "block";
    //     //     } else {
    //     //         document.querySelector(".message").style.display = "none";
    //     //     }
    //     // });
    //     this.form.email.addEventListener("blur", (e) => {
    //         const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //         if (!pattern.test(e.target.value))
    //             this.form.email.parentElement.querySelector(
    //                 ".message"
    //             ).style.display = "block";
    //         else
    //             this.form.email.parentElement.querySelector(
    //                 ".message"
    //             ).style.display = "none";
    //     });
    // }

    renderForm = async () => `
        <div class="form-add-container">
        <button class="btn-close"></button>
        <form action="#" method="post" name="form" class="form-add">
            <title class="form-title">Add new Employee</title>
            <div class="form-content">
                <label class="form-2">
                    <span class="form-label">Name</span>
                    <input type="text" placeholder="Please type your name" name="name" class="form-control" required>
                    <span class="message">Valid name!</span>
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
                    <input type="text" placeholder="Please type your address  " name="address" class="form-control" required>
                    <span class="message"></span>
                </label>
                <label class="form-2">
                    <span class="form-label">Email</span>
                    <input type your="email"  placeholder="Please type your email  " name="email" class="form-control" required>
                    <span class="message">Valid email!</span>
                </label>
                <label class="form-2">
                    <span class="form-label">Phone</span>
                    <input type="text" placeholder="Please type your phone  " name="phone" class="form-control" required>
                    <span class="message"></span>
                </label>
            </div>
            <div class="form-action">
                <button type="reset" class="btn btn-dark" name="btnReset">Reset</button>
                <button type="submit" class="btn btn-dark" name="btnSave">Save</button>
            </div>
        </form>
        </div>
    `;

    renderFormSearch = () => `
        <form class="form-search" name="formSearch" action="/search" method="post">
            <input type="text" class="control-search" placeholder="Search...">
            <button class="icon-search" type="submit"></button>
        </form>
    `;
}
