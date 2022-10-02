import { EmployeesModel } from "./model";
import EmployeesView from "./view";
import { $, employeeSelector } from "../constant";
import EmployeeCtrl from "../employee/controller";

export default class EmployeesCtrl {
    /**
     *
     * @param  {String} rootSelector
     */
    constructor() {
        this.model = new EmployeesModel();
        this.view = new EmployeesView();
        this.employeeCtrl = new EmployeeCtrl();
    }

    async render() {
        const data = await this.model.findAll();
        this.destroyEvents();
        this.view.renderTable(data);
        this.elements = document.querySelectorAll(".employees .table-body tr");
        this.initEvents();
    }
    initEvents() {
        this.initEventNew();
        this.initEventDelete();
        // this.initEventSearch();
        this.initEventUpdate();
        // this.view.formNew.btnSave.addEventListener("click", this.handleSave);
    }
    destroyEvents() {
        this.destroyEventDelete();
        this.destroyEventUpdate();
    }

    initEventSearch() {
        this.view.formSearch.keyword.addEventListener("keyup", (e) => {
            this.handleSearch(e.target.value);
        });
    }
    initEventNew() {
        $(".employees .btn-add").addEventListener("click", (e) => {
            this.employeeCtrl.OpenModal("Add new employee");
            this.employeeCtrl.initEvents();
        });
    }
    initEventUpdate() {
        if (this.elements)
            this.elements.forEach((element) => {
                element
                    .querySelectorAll("button")[1]
                    .addEventListener("click", this.handleBtnUpdate);
            });
    }
    initEventDelete() {
        if (this.elements)
            this.elements.forEach((element) => {
                element
                    .querySelectorAll("button")[0]
                    .addEventListener("click", this.handleBtnDelete.bind(this));
            });
    }

    destroyEventDelete() {
        if (this.elements)
            this.elements.forEach((element) => {
                element
                    .querySelectorAll("button")[0]
                    .removeEventListener("click", this.handleBtnDelete);
            });
    }
    destroyEventUpdate() {
        if (this.elements)
            this.elements.forEach((element) => {
                element
                    .querySelectorAll("button")[1]
                    .removeEventListener("click", this.handleBtnUpdate);
            });
    }

    // handleSave = (e) => {
    //     e.preventDefault();

    //     const inputs = this.view.handleSubmit();
    //     if (inputs?.id != null)
    //         this.employee.update(inputs).then(async (data) => {
    //             if (data) {
    //                 this.destroyEvents();
    //                 await this.render();
    //                 this.initEvents();
    //             }
    //         });
    //     else
    //         this.employee.create(inputs).then(async (data) => {
    //             if (data) {
    //                 this.destroyEvents();
    //                 await this.render();
    //                 this.initEvents();
    //             }
    //         });
    // };
    handleSearch = (keyword) => {
        if (keyword.trim() === "") this.render();
        else
            this.model.search(keyword).then((data) => {
                this.view.renderTable(data);
            });
    };
    handleBtnDelete = (e) => {
        const id = e.path[2].getAttribute("data-id");
        this.model.findById(id).then((data) => {
            if (confirm(`You want to remove an employee "${data.name}"`))
                this.model.deleteById(id).then(async (data) => {
                    this.render();
                });
        });
    };

    handleBtnUpdate = async (e) => {
        const id = e.path[2].getAttribute("data-id");
        this.model
            .findById(id)
            .then((data) => this.view.openModal("Update Employee", data));
    };
}
