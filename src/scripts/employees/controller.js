/* eslint-disable no-undef */
import { EmployeesModel } from "./model";
import EmployeesView from "./view";
import { goto } from "../helpers/routes-helper";
import { subPublish } from "../helpers/state-manager";
// eslint-disable-next-line no-unused-vars
import { Employee } from "../employee/model";
import { $, rootSelector as root } from "../constant";
import { PaginationController } from "../pagination/controller";

class EmployeesCtrl {
    /**
     *
     * @param {String} selector
     */
    constructor(selector) {
        this.selector = selector;
        this.view = new EmployeesView(selector);
        this.model = new EmployeesModel();
        this.paginationController = new PaginationController(this.selector);

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
            subPublish.publish(`${this.selector}:pagination-init`);
        });

        subPublish.subscribe(`${this.selector}:page-changed`, (currentPage) => {
            this.destroyEvents();

            const employees = this.employees.slice(
                (currentPage - 1) * 10,
                currentPage * 10
            );

            this.view.template(employees);
        });

        localStorage.setItem(
            this.selector,
            JSON.stringify({
                events: [
                    "redirect",
                    "update",
                    "create",
                    "page-changed",
                    "pagination-init",
                ],
            })
        );
    }
    /**
     *
     * @param {String} filter
     * @param {String} property
     */
    async loadData(filter, property) {
        this.view.templateLoader();

        let employees = null;
        if (filter) {
            employees = await this.model.search(filter, property);
        } else employees = await this.model.findAll();
        this.setEmployees(employees);
    }

    /**
     *
     * @param {Array<Employee>} employees
     */
    setEmployees(employees) {
        this.employees = employees;
        const pageC = this.employees.length / 10;
        this.paginationController.pageC = Math.ceil(pageC);

        subPublish.publish(`${this.selector}:currentPage-changed`);

        this.render();

        this.paginationController.setCurrentPage(1);
    }

    render() {
        this.view.template(this.employees.slice(0, 10));
    }

    initEvents() {
        console.log("employees initialized");
        this.view.tbody = $(
            `${root} .${this.view.selector} table.list-employee tbody`
        );

        this.rows = this.view.tbody.querySelectorAll("tr");
        this.view.btnAdd = $(`${root} .${this.view.selector} .btn-add`);
        this.view.formSearch = $(`${root} .${this.view.selector} .form-search`);
        this.initEventTbody();
        this.initEventNew();
        this.initEventSearch();
    }

    initEventTbody() {
        this.__initEventTbody = this.handleEventTbody.bind(this);
        this.view.tbody.addEventListener("click", this.__initEventTbody);
    }

    handleEventTbody(e) {
        if (e.path[0].className.match("btn-delete")) {
            this.initEventDelete(e.path[2].getAttribute("data-id"));
        } else if (e.path[0].className.match("btn-update")) {
            this.initEventUpdate(e.path[2].getAttribute("data-id"));
        }
    }

    initEventUpdate(id) {
        this.handleBtnUpdate(id);
    }
    initEventDelete(id) {
        this.handleBtnDelete(id);
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

    handleBtnNew() {
        this.destroyEvents();
        subPublish.publish(`${this.selector}:currentPage-changed`);
        goto("employee-page");
    }
    /**
     *
     * @param {Event} e
     */

    async handleBtnUpdate(id) {
        const employee = await this.model.findById(id);

        this.destroyEvents();
        subPublish.publish(`${this.selector}:currentPage-changed`);
        history.pushState(employee, "", `/${this.selector}/${id}`);
        goto("employee-page", employee);
    }

    /**
     *
     * @param {Event} e
     */
    handleSearch = (e) => {
        const keyword = e.target.value;
        this.destroyEvents();
        this.loadData(keyword, "name");
    };

    /**
     *
     * @param {Event} e
     */
    async handleBtnDelete(id) {
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

    destroyEvents() {
        this.destroyEventTbody();

        this.destroyEventNew();
        this.destroyEventSearch();
    }
    destroyEventTbody() {
        this.view.tbody.removeEventListener("click", this.__initEventTbody);
    }
    destroyEventSearch() {
        $(`${root} .${this.view.selector} .form-search`)[
            "keyword"
        ].removeEventListener("keyup", this.__initEventSearch);
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
        $(`${root} .${this.view.selector} .btn-add`).removeEventListener(
            "click",
            this._initEventNew
        );
    }
}

export { EmployeesCtrl };
