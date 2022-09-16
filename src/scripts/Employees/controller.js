import { EmployeesModel } from "./model";
import EmployeesView from "./view";

export default class EmployeesCtrl {
    /**
     *
     * @param {EmployeesModel} model
     * @param {EmployeesView} view
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.renderTable = () => {
            this.model.findAll().then((data) => {
                this.view.displayTable(
                    data,
                    this.handleBtnDelete,
                    this.handleBtnUpdate,
                    this.handleSearch
                );
            });
        };
        this.handleSearch = (keyword) => {
            if (keyword.trim() === "") this.renderTable();
            else
                this.model.search(keyword).then((data) => {
                    this.view.displayTable(
                        data,
                        this.handleBtnDelete,
                        this.handleBtnUpdate
                    );
                });
        };
        this.handleBtnDelete = (id) => {
            this.model.getById(id).then((data) => {
                if (confirm(`You want to remove an employee "${data.name}"`))
                    this.model.deleteById(id).then((data) => {
                        this.renderTable();
                    });
            });
        };

        this.handleBtnUpdate = (id) => {
            this.model.getById(id).then((data) => {
                this.view.openModal("Update Employee", data);
            });
        };
    }

    run() {
        this.renderTable();

        this.view.handleSearch(this.handleSearch);

        this.view.btnAdd.addEventListener("click", (e) => {
            this.view.openModal("Add new Employee");
        });
        this.view.form.btnSave.addEventListener("click", async(e) => {
            e.preventDefault();
            const inputs = this.view.handleSubmit();
            if (inputs.id != null)
                await this.model.update(inputs).then((data) => data);
            else await this.model.create(inputs).then((data) => data);
            this.renderTable();
        });
        this.view.form.name.addEventListener("blur", (e) => {
            const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            console.log(pattern.test(e.target.value));
            if (e.target.value.length < 6) {
                document.querySelector(".message").style.display = "block";
            } else {
                document.querySelector(".message").style.display = "none";
            }
        });
    }
}