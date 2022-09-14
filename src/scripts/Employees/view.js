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

    renderRow = (value, index) =>
        `<tr class="row-${index}">
                <td>${index}</td>
                <td>${value.name}</td>
                <td>${value.address}</td>
                <td>
                    <div class=` +
        `${value.status ? " active" : "inactive"}>
                    </div>
                </td>
                <td>
                    <button class="btn btn-warning">Update</button>
                    <button class="btn btn-danger">Delete</button>
                </td>
            </tr>`;
    /**
     *
     * @param {Array<Employee>} data
     * @param {function} renderRow
     */

    displayTable(data, handleBtnDelete, handleBtnUpdate) {
        const rows = data.map((value, index) => this.renderRow(value, index));
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

    displayForm(title, handleSave, renderTable, data) {
        this.formTitle.innerHTML = title;
        this.form_add.style.display = "block";
        this.btn_close.addEventListener("click", (e) => {
            document.form.btnReset.click();
            this.form_add.style.display = "none";
        });

        if (data) {
            document.form.name.value = data.name;
            document.form.email.value = data.email;
            document.form.phone.value = data.phone;
            document.form.address.value = data.address;
            document.form.status.value = data.status ? "active" : "inactive";
            document.form.gender.value = data.gender;
        }
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
            if (data) {
                input.id = data.id;
            }

            handleSave(input).then((data1) => {
                if (data1) {
                    document.form.btnReset.click();
                    this.form_add.style.display = "none";
                    renderTable();
                }
            });
        });
    }

    handleSearch(handle) {
        this.inputSearch.addEventListener("keyup", (e) => {
            handle(e.target.value);
        });
    }
}