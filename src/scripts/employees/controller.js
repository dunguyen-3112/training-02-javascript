import { EmployeesModel } from "./model";
import EmployeesView from "./view";
import { goto } from "../helpers/routes-helper";
import { selectorTableEmployee } from "./constant";
import { subPublish } from "../helpers/state-manager";

class EmployeesCtrl {
    constructor(selector) {
        this.view = new EmployeesView(selector, selectorTableEmployee);
        this.model = new EmployeesModel();
        this.isLoading = true;

        subPublish.subscribe("update", (employee) => {
            const employees = this.employees;
            for (let i = 0; i < employees.length; i++) {
                if (employees[i].id === employee.id) {
                    Object.assign(employees[i], employee);
                    break;
                }
            }
            this.setEmployees(employees);
        });

        subPublish.subscribe("create", (employee) => {
            const employees = [employee, ...this.employees];
            this.setEmployees(employees);
        });

        subPublish.subscribe("close", () => {
            this.initEvents();
        });
    }

    loading() {
        console.log("... Loading...");
    }

    async getEmployees(filter, property) {
        this.loading();
        this.isLoading = true;

        let employees = null;

        if (filter) {
            employees = await this.model.search(filter, property);
        } else employees = await this.model.findAll();

        this.setEmployees(employees);
        this.isLoading = false;
    }

    setEmployees(employees) {
        this.employees = employees;
        this.render();
        this.initEvents();
    }

    render() {
        this.view.renderList(this.employees);
    }

    initEvents() {
        console.log("initEvents");
        this.initEventDelete();
        this.initEventUpdate();
        this.initEventNew();
        this.initEventSearch();
    }

    initEventUpdate() {
        this._initEventUpdate = this.handleBtnUpdate.bind(this);
        this.view.rows().forEach((element) => {
            element
                .querySelectorAll("button")[1]
                .addEventListener("click", this._initEventUpdate);
        });
    }
    initEventDelete() {
        this._initEventDelete = this.handleBtnDelete.bind(this);
        this.view.rows().forEach((element) => {
            element
                .querySelectorAll("button")[0]
                .addEventListener("click", this._initEventDelete);
        });
    }
    initEventTodo() {
        this._initEventTodo = this.handleTodo.bind(this);
        this.view.rows().forEach((element) => {
            element.addEventListener("dblclick", this._initEventTodo);
        });
    }
    initEventSearch() {
        this.__initEventSearch = this.handleSearch.bind(this);
        this.view.formSearch["keyword"].addEventListener(
            "keyup",
            this.__initEventSearch
        );
    }

    initEventNew() {
        this._initEventNew = this.handleBtnNew.bind(this);
        this.view.btnAdd.addEventListener("click", this._initEventNew);
    }
    destroyEvents() {
        console.log("destroyEvents");
        this.destroyEventDelete();
        this.destroyEventUpdate();
        this.destroyEventNew();
        this.destroyEventSearch();
    }
    destroyEventSearch() {
        this.view.formSearch["keyword"].removeEventListener(
            "keyup",
            this.__initEventSearch
        );
    }
    destroyEventUpdate() {
        this.view.rows().forEach((element) => {
            element
                .querySelectorAll("button")[1]
                .removeEventListener("click", this._initEventUpdate);
        });
    }
    destroyEventDelete() {
        this.view.rows().forEach((element) => {
            element
                .querySelectorAll("button")[0]
                .removeEventListener("click", this._initEventDelete);
        });
    }

    destroyEventNew() {
        this.view.btnAdd.removeEventListener("click", this._initEventNew);
    }
    handleBtnNew() {
        this.destroyEvents();

        goto("employee-page");
    }

    async handleBtnUpdate(e) {
        this.destroyEvents();

        const id = e.path[2].getAttribute("data-id");
        const employee = await this.model.findById(id);

        goto("employee-page", employee);
    }

    handleSearch = async (e) => {
        const keyword = e.target.value;
        this.destroyEvents();
        await this.getEmployees(keyword, "name");
    };
    async handleBtnDelete(e) {
        this.destroyEvents();
        const id = e.path[2].getAttribute("data-id");

        const data = await this.model.findById(id);
        // eslint-disable-next-line no-undef
        if (data && confirm(`You want to remove an employee "${data.name}"`)) {
            await this.model.deleteById(id);
            const employees = this.employees.filter(
                (employee) => employee.id != id
            );

            this.setEmployees(employees);
        }
    }
}
export { EmployeesCtrl };
