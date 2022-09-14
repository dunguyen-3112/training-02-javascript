export default class EmployeesView {
    constructor() {
            console.log("init");
            this.tbody = document.querySelector(".table-body");
            this.btnAdd = document.querySelector(".btn-add");
            this.inputSearch = document.querySelector(".control-search");
            this.form_add = document.querySelector(".form-add-container");
            this.btn_close = document.querySelector(".btn-close");
            this.form = document.form;
        }
        /**
         *
         * @param {Array<Employee>} data
         * @param {function} renderRow
         */
    displayTable(data, renderRow, handleBtnDelete, handleBtnUpdate) {
        const rows = data.map((value, index) => renderRow(value, index));
        this.tbody.innerHTML = rows.join("");
        for (let i = 0; i < data.length; i++) {
            let element = document.querySelector(`.row-${i}`);
            element
                .querySelectorAll("button")[1]
                .addEventListener("click", (e) => {
                    handleBtnDelete(data[i].id);
                });
            element
                .querySelectorAll("button")[0]
                .addEventListener("click", (e) => {
                    handleBtnUpdate(data[i].id);
                });
        }
    }

    displayFormAdd(handleSave, renderTable) {
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
            handleSave(input).then((data) => {
                if (data) {
                    document.form.btnReset.click();
                    this.form_add.style.display = "none";
                    renderTable();
                }
            });
        });
    }

    handle_btnAdd(displayFormAdd) {
        this.btnAdd.addEventListener("click", (e) => {
            displayFormAdd();
        });
    }
}