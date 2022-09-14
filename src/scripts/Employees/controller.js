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

        this.handleSave = (input) => {
            if (input.id) return this.model.update(input).then((data) => data);
            return this.model.create(input).then((data) => data);
        };
        this.handleBtnUpdate = (id) => {
            this.model.getById(id).then((data) => {
                this.view.displayForm(
                    "Update Employee",
                    this.handleSave,
                    this.renderTable,
                    data
                );
            });
        };
    }

    run() {
        this.renderTable();

        this.view.handleSearch(this.handleSearch);

        this.view.btnAdd.addEventListener("click", (e) => {
            this.view.displayForm(
                "Add new Employee",
                this.handleSave,
                this.renderTable
            );
        });
    }
}