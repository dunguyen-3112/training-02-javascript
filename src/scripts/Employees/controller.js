import EmployeeCtrl from "../Employee/controller";
import EmployeesModel from "./model";
import EmployeesView from "./view";

export default class EmployeesCtrl {
    /**
     *
     * @param {EmployeesModel} model
     * @param {EmployeesView} view
     * @param {EmployeeCtrl} ctrl
     */
    constructor(model, view, ctrl) {
        this.model = model;
        this.view = view;
        this.ctrl = ctrl;
    }

    run() {
        const renderTable = () => {
            this.model.findAll().then((data) => {
                this.view.displayTable(
                    data,
                    renderRow,
                    handleBtnDelete,
                    handleBtnUpdate
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
            this.ctrl.handleBtnUpdate(id).then((data) => {
                console.log(data);
            });
        };
        const handleBtnDelete = (id) => {
            this.ctrl.handleBtnDelete(id).then((data) => {
                if (confirm(`You want to remove an employee "${data}"`))
                    this.ctrl.handleDelete(id).then((data) => {
                        renderTable();
                        console.log(data);
                    });
            });
        };
        const renderRow = (value, index) => {
            return this.ctrl.renderRow(value, index);
        };

        const HandleBtnAdd = () => {
            this.ctrl.displayFormAdd(renderTable);
        };
        this.view.handle_btnAdd(HandleBtnAdd);
    }
}