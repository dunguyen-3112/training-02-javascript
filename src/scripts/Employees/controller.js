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
    }

    run() {
        const renderRow = (value, index) =>
            `<tr class="row-${index}"><td>${index}</td><td>${value.name}</td><td>${value.address}</td><td><div class=` +
            `${
                value.status ? " active" : "inactive"
            }></div></td><td><button class="btn btn-warning">Update</button><button class="btn btn-danger">Delete</button></td></tr>`;
        const renderTable = () => {
            this.model.findAll().then((data) => {
                this.view.displayTable(
                    data,
                    renderRow,
                    handleBtnDelete,
                    handleBtnUpdate,
                    handleSearch
                );
            });
        };
        renderTable();
        this.view.inputSearch.addEventListener("keyup", (e) => {
            handleSearch(e.target.value);
        });

        const handleSearch = (keyword) => {
            if (keyword.trim() === "") renderTable();
            else
                this.model.search(keyword).then((data) => {
                    this.view.displayTable(
                        data,
                        renderRow,
                        handleBtnDelete,
                        handleBtnUpdate,
                        handleSearch
                    );
                });
        };

        const handleBtnUpdate = (id) => {
            this.model.getById(id).then((data) => {
                console.log(data);
            });
        };
        const handleBtnDelete = (id) => {
            this.model.getById(id).then((data) => {
                if (confirm(`You want to remove an employee "${data.name}"`))
                    this.model.deleteById(id).then((data) => {
                        renderTable();
                        console.log(data);
                    });
            });
        };

        const HandleBtnAdd = () => {
            const handleSave = (input) => {
                return this.model.create(input).then((data) => data);
            };
            this.view.displayFormAdd(handleSave, renderTable);
        };
        this.view.handle_btnAdd(HandleBtnAdd);
    }
}