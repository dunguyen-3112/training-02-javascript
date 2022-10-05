import { EmployeesModel } from "./model";
import EmployeesView from "./view";
import { $, rootSelector } from "../constant";
import EmployeeCtrl from "../employee/controller";
import { goto } from "../helpers/routes-helper";
import { selectorTableEmployee } from "./constant";

class EmployeesCtrl {
    constructor(selector) {
        this.view = new EmployeesView(selector, selectorTableEmployee);
        this.model = new EmployeesModel();
        this.data = null;
    }

    renderBtnNew() {
        this.view.renderBtnNew();
    }

    async render(data) {
        this.renderBtnNew();
        try {
            if (data == undefined) {
                this.data = await this.model.findAll();
            } else this.data = data;

            this.data.forEach((employee, index) => {
                goto("employee-page", {
                    employee: employee,
                    index: index,
                    selectorTableEmployee: `${rootSelector} .${this.view.selector} table.${selectorTableEmployee} tbody`,
                });
            });
        } catch (error) {
            console.log("Error1: ", error.message);
            throw error;
        }
        this.initEvents();
    }
    initEvents() {
        // this.initEventDelete();
        // this.initEventUpdate();
        this.initEventNew();
        // this.initEventSearch();
        // this.initEventTodo();
        // this.employeeCtrl.initEvents();
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
        $(`${rootSelector} .${this.view.selector} .btn-add`).addEventListener(
            "click",
            (e) => {
                alert("Please select your");
            }
        );
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
export { EmployeesCtrl };
