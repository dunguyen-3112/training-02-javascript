import { EmployeesModel } from "./model";
import EmployeesView from "./view";
import { $, employeeSelector } from "../constant";
import EmployeeCtrl from "../employee/controller";

export default class EmployeesCtrl {
    constructor() {
        this.model = new EmployeesModel();
        this.view = new EmployeesView();
        this.employeeCtrl = new EmployeeCtrl();
        this.data = null;
    }

    async render(data) {
        try {
            if (data == undefined) {
                this.data = await this.model.findAll();
            } else this.data = data;

            const rows = [];
            this.data.forEach((employee, index) => {
                let row = this.employeeCtrl.render("row", employee, index);
                rows.push(row);
            });
            this.view.renderTable(rows);
            this.initEvents();
        } catch (error) {
            console.log("Error1: ", error.message);
            throw error;
        }
    }
    initEvents() {
        this.initEventDelete();
        this.initEventUpdate();
        this.initEventNew();
        this.initEventSearch();
        this.initEventTodo();
        this.employeeCtrl.initEvents();
    }
    destroyEvents() {}
    initEventTodo() {
        this.view.rows().forEach((element) => {
            this.employeeCtrl.initEventTodo(element);
        });
    }
    initEventUpdate() {
        this.view.rows().forEach((element) => {
            this.employeeCtrl.initEventUpdate(element);
        });
    }
    initEventDelete() {
        this.view.rows().forEach((element) => {
            this.employeeCtrl.initEventDelete(element);
        });
    }
    destroyEventUpdate() {
        this.view.rows().forEach((element) => {
            this.employeeCtrl.destroyEventUpdate(element);
        });
    }
    destroyEventDelete() {
        this.view.rows().forEach((element) => {
            this.employeeCtrl.destroyEventDelete(element);
        });
    }

    initEventSearch() {
        $(".form-search").keyword.addEventListener("keyup", (e) => {
            this.handleSearch(e.target.value);
        });
    }
    render1(data) {
        const row = this.view.addRow(
            this.employeeCtrl.view.renderRow(this.view.numberRows(), data)
        );
        this.destroyEventUpdate();
        this.initEventUpdate();
        this.destroyEventDelete();
        this.initEventDelete();
        this.initEventTodo();
    }
    initEventNew() {
        $(".employees .btn-add").addEventListener("click", (e) => {
            this.employeeCtrl.render("new", this.render1.bind(this));
        });
    }

    handleSearch = async (keyword) => {
        if (keyword.trim() === "") this.render();
        else
            try {
                const data = await this.model.search(keyword);
                this.render(data);
            } catch (error) {
                throw error;
            }
    };
}
