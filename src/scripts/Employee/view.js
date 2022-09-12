export default class EmployeeView {
    constructor() {
        this.form_add = document.querySelector(".form-add-container");
        this.btn_close = document.querySelector(".btn-close");
        this.form = document.form;
    }

    displayFormAdd(handleSave) {
        this.form_add.style.display = "block";
        this.btn_close.addEventListener("click", (e) => {
            document.form.btnReset.click();
            this.form_add.style.display = "none";
        });
        this.form.btnSave.addEventListener("click", (e) => {
            e.preventDefault();
            const input = {
                name: document.form.name.value,
                phone: document.form.phone.value,
                address: document.form.address.value,
                email: document.form.email.value,
                status: document.form.status.value === "active" ? true : false,
                gender: document.form.gender.value,
            };
            handleSave(input);
        });
    }

    handleUpdate = (id) => {
        console.log(id);
    };

    renderRow = (row, index) =>
        `<tr class="row-${index}"><td>${index}</td><td>${row.name}</td><td>${row.address}</td><td><div class=` +
        `${
            row.status ? " active" : "inactive"
        }></div></td><td><button class="btn btn-warning">Update</button><button class="btn btn-danger">Delete</button></td></tr>`;
}