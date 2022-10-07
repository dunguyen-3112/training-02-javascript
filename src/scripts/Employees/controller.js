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
    async render(data) {
        if (data == undefined) {
            this.data = await this.model.findAll();
        } else this.data = data;

        this.data.forEach((employee, index) => {
            this.renderRow({ employee, index });
        });
    }
    initEvents() {
        this.initEventDelete();
        this.initEventUpdate();
        this.initEventNew();
    }
    destroyEvents() {
        this.destroyEventDelete();
        this.destroyEventUpdate();
        this.destroyEventNew();
    }
    initEventTodo() {
        this.view.rows().forEach((element) => {
            this.employeeCtrl.initEventTodo(element);
        });
    }
    initEventUpdate() {
        console.log("initEventUpdate");
        this._initEventUpdate = this.handleBtnUpdate.bind(this);
        this.view.rows().forEach((element) => {
            element
                .querySelectorAll("button")[1]
                .addEventListener("click", this._initEventUpdate);
        });
    }
    initEventDelete() {
        console.log("initEventDelete");
        this._initEventDelete = this.handleBtnDelete.bind(this);
        this.view.rows().forEach((element) => {
            element
                .querySelectorAll("button")[0]
                .addEventListener("click", this._initEventDelete);
        });
    }
    destroyEventUpdate() {
        console.log("destroyEventUpdate");
        this.view.rows().forEach((element) => {
            element
                .querySelectorAll("button")[1]
                .removeEventListener("click", this._initEventUpdate);
        });
    }
    destroyEventDelete() {
        console.log("destroyEventDelete");
        this.view.rows().forEach((element) => {
            element
                .querySelectorAll("button")[0]
                .removeEventListener("click", this._initEventDelete);
        });
    }

    initEventSearch() {
        $(".form-search").keyword.addEventListener("keyup", (e) => {
            this.handleSearch(e.target.value);
        });
    }

    initEventNew() {
        console.log("initEventNew");
        this._initEventNew = this.handleBtnNew.bind(this);
        this.view.btnAdd.addEventListener("click", this._initEventNew);
    }
    destroyEventNew() {
        console.log("destroyEventNew");
        this.view.btnAdd.removeEventListener("click", this._initEventNew);
    }
    renderRow(params) {
        this.view.renderRow(params);
    }
    handleBtnNew() {
        this.destroyEvents();
        goto("employee-page", this);
    }

    updateRow({ employee }) {
        this.view.updateRow(employee);
    }

    async handleBtnUpdate(e) {
        const id = e.path[2].getAttribute("data-id");

        const data = await this.model.findById(id);
        this.destroyEvents();
        goto("employee-page", {
            employee: data,
            index: id,
            ctrl: this,
        });
    }

    handleSearch = async (keyword) => {
        if (keyword.trim() === "") this.render();
        else {
            const data = await this.model.search(keyword);
            this.render(data);
        }
    };
    async handleBtnDelete(e) {
        const id = e.path[2].getAttribute("data-id");

        const data = await this.model.findById(id);
        if (data && confirm(`You want to remove an employee "${data.name}"`)) {
            const d = await this.model.deleteById(id);
            if (d != undefined) {
                const rows = e.path[3].rows,
                    len = rows.length,
                    index = e.path[2].rowIndex;
                for (let i = index; i < len; i++) {
                    rows[i].cells[0].innerHTML = i - 1;
                }
                e.path[2].remove();
            } else {
                console.log("Error: ", "Failed to internet connection...");
            }
        }
    }
}
export { EmployeesCtrl };
