/* eslint-disable no-undef */
import { EmployeesModel } from "./model";
import EmployeesView from "./view";
import { goto } from "../helpers/routes-helper";
import { subPublish } from "../helpers/state-manager";
// eslint-disable-next-line no-unused-vars
import { Employee } from "../employee/model";
import { $, rootSelector as root } from "../constant";

class EmployeesCtrl {
    /**
     *
     * @param {String} selector
     */
    constructor(selector) {
        this.selector = selector;
        this.view = new EmployeesView(selector);
        this.model = new EmployeesModel();
    }
    /**
     *
     * @param {String} filter
     * @param {String} property
     */
    async loadData(filter, property) {
        this.view.template();

        let employees = null;

        if (filter) {
            employees = await this.model.search(filter, property);
        } else employees = await this.model.findAll();
        this.setEmployees(employees);

        subPublish.subscribe(`${this.selector}:create`, (employee) => {
            const employees = [employee, ...this.employees];
            this.setEmployees(employees);
        });

        subPublish.subscribe(`${this.selector}:update`, (employee) => {
            const employees = this.employees;
            for (let i = 0; i < employees.length; i++) {
                if (employees[i].id === employee.id) {
                    Object.assign(employees[i], employee);
                    break;
                }
            }
            this.setEmployees(employees);
        });
        subPublish.subscribe(`${this.selector}:redirect`, () => {
            this.initEvents();
        });

        localStorage.setItem(
            this.selector,
            JSON.stringify({ events: ["redirect", "update", "create"] })
        );
    }

    /**
     *
     * @param {Array<Employee>} employees
     */
    setEmployees(employees) {
        this.employees = employees;
        this.render();
        this.initEvents();
    }

    render() {
        this.view.template(this.employees);
    }

    initEvents() {
        this.view.tbody = $(
            `${root} .${this.view.selector} table.list-employee tbody`
        );
        this.rows = this.view.tbody.querySelectorAll("tr");
        this.view.btnAdd = $(`${root} .${this.view.selector} .btn-add`);
        this.view.formSearch = $(`${root} .${this.view.selector} .form-search`);

        this.initEventDelete();
        this.initEventUpdate();
        this.initEventNew();
        this.initEventSearch();
    }

    initEventUpdate() {
        this._initEventUpdate = this.handleBtnUpdate.bind(this);

        this.rows.forEach((element) => {
            element
                .querySelectorAll("button")[1]
                .addEventListener("click", this._initEventUpdate);
        });
    }
    initEventDelete() {
        this._initEventDelete = this.handleBtnDelete.bind(this);
        this.rows.forEach((element) => {
            element
                .querySelectorAll("button")[0]
                .addEventListener("click", this._initEventDelete);
        });
    }
    initEventSearch() {
        this.__initEventSearch = this.handleSearch.bind(this);
        $(`${root} .${this.view.selector} .form-search`)[
            "keyword"
        ].addEventListener("keyup", this.__initEventSearch);
    }

    initEventNew() {
        this._initEventNew = this.handleBtnNew.bind(this);
        this.view.btnAdd.addEventListener("click", this._initEventNew);
    }
    destroyEvents() {
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
        this.rows.forEach((element) => {
            element
                .querySelectorAll("button")[1]
                .removeEventListener("click", this._initEventUpdate);
        });
    }
    destroyEventDelete() {
        this.rows.forEach((element) => {
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
    /**
     *
     * @param {Event} e
     */

    async handleBtnUpdate(e) {
        const id = e.path[2].getAttribute("data-id");
        const employee = await this.model.findById(id);

        this.destroyEvents();
        history.pushState(employee, "", `/${this.selector}/${id}`);
        goto("employee-page", employee);
    }

    /**
     *
     * @param {Event} e
     */
    handleSearch = async (e) => {
        const keyword = e.target.value;
        this.destroyEvents();
        await this.loadData(keyword, "name");
    };

    /**
     *
     * @param {Event} e
     */
    async handleBtnDelete(e) {
        const id = e.path[2].getAttribute("data-id");
        const data = await this.model.findById(id);

        history.pushState({}, "", `/${this.selector}/delete?id=${id}`);

        // eslint-disable-next-line no-undef
        if (data && confirm(`You want to remove an employee "${data.name}"`)) {
            this.destroyEvents();

            await this.model.deleteById(id);

            const employees = this.employees.filter(
                (employee) => employee.id != id
            );

            this.setEmployees(employees);
        }

        history.back();
    }
}

export { EmployeesCtrl };
