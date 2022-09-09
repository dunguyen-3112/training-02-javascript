export default class EmployeeView {
    constructor() {
        this.form_add = document.querySelector(".form-add-container");
        this.btn_close = document.querySelector(".btn-close");
        this.form = document.form;
    }

    display_FormAdd() {
        this.form_add.style.display = "block";
        this.btn_close.addEventListener("click", (e) => {
            document.form.btnReset.click();
            this.form_add.style.display = "none";
        });
    }

    renderRow = (row, index) =>
        `<tr><td>${index}</td><td>${row.name}</td><td>${row.address}</td><td><div class=` +
        `${
            row.status ? " active" : "inactive"
        }></div></td><td><button class="btn btn-warning">Update</button><button class="btn btn-danger">Delete</button></td></tr>`;
}