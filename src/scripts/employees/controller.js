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
    #model = new EmployeesModel();
    #view = null;
    #paginationController = null;
    #employees = [];
    #selector;
    #__initEventTbody;
    #__initEventNew;
    #__initEventSearch;
    #currentPage = 1;
    #managerStates = [];

    /**
     *
     * @param {String} selector
     */
    constructor(selector) {
        this.#selector = selector;
        this.#view = new EmployeesView(selector);
        this.#paginationController = new PaginationController(selector);

        this.#managerStates = [
            {
                event: `${this.#selector}:create`,
                callback: (employee) => {
                    const employees = [employee, ...this.#employees];
                    this.#setEmployees(employees);
                },
            },
            {
                event: `${this.#selector}:update`,
                callback: (employee) => {
                    const employees = this.#employees;
                    for (let i = 0; i < employees.length; i++) {
                        if (employees[i].id === employee.id) {
                            Object.assign(employees[i], employee);
                            break;
                        }
                    }
                    this.#setEmployees(employees);
                },
            },
            {
                event: `${this.#selector}:redirect`,
                callback: () => {
                    this.#initEvents();
                    subPublish.publish(`${this.#selector}:DOM`);
                },
            },
            {
                event: `${this.#selector}:currentPage-changed`,
                callback: (currentPage) => this.#setCurrentPage(currentPage),
            },
        ];

        this.#managerStates.forEach((item) => {
            subPublish.clear(item.event);
            subPublish.subscribe(item);
        });
    }

    /**
     *
     * @param {String} filter
     * @param {String} property
     */
    async #loadData(filter, property) {
        this.#view.templateLoader();

        let employees = null;
        if (filter) {
            employees = await this.#model.search(filter, property);
        } else employees = await this.#model.findAll();
        this.#setEmployees(employees);
    }

    #setCurrentPage(currentPage) {
        this.#currentPage = currentPage;

        this.#destroyEvents();

        const employees = this.#employees.slice(
            (currentPage - 1) * 10,
            currentPage * 10
        );

        subPublish.publish(`${this.#selector}:DOM-change`);

        this.#view.template(employees);
        this.#initEvents();
    }

    /**
     *
     * @param {Array<Employee>} employees
     */
    #setEmployees(employees) {
        this.#employees = employees;
        const pageC = Math.ceil(this.#employees.length / 10);
        if (pageC === 0) {
            this.#destroyEvents();
            subPublish.publish(`${this.#selector}:DOM-change`, {
                value: pageC,
            });
            this.#view.getTbody().innerHTML = "";
            this.#initEvents();
            return;
        }
        subPublish.publish(`${this.#selector}:DOM-change`, {
            value: pageC,
        });

        this.render();
        this.#paginationController.setCurrentPage(this.#currentPage);
        return;
    }

    render() {
        // if employees is not empty then display else fetch data
        if (this.#employees.length > 0) {
            this.#view.template(this.#employees.slice(0, 10));
            return;
        }
        this.#loadData();
    }

    #initEvents() {
        this.#initEventTbody();
        this.#initEventNew();
        this.#initEventSearch();
    }

    #initEventTbody() {
        this.#__initEventTbody = this.#handleEventTbody.bind(this);
        this.#view.getTbody().addEventListener("click", this.#__initEventTbody);
    }

    #handleEventTbody(e) {
        if (e.path[0].className.match("btn-delete")) {
            this.#initEventDelete(e.path[2].getAttribute("data-id"));
        } else if (e.path[0].className.match("btn-update")) {
            this.#initEventUpdate(e.path[2].getAttribute("data-id"));
        }
    }

    #initEventUpdate(id) {
        this.#handleBtnUpdate(id);
    }
    #initEventDelete(id) {
        this.#handleBtnDelete(id);
    }
    #initEventSearch() {
        this.#__initEventSearch = this.#handleSearch.bind(this);

        this.#view
            .getFormSearch()
            .addEventListener("keyup", this.#__initEventSearch);
    }

    #initEventNew() {
        this.#__initEventNew = this.#handleBtnNew.bind(this);

        this.#view.getBtnAdd().addEventListener("click", this.#__initEventNew);
    }

    #handleBtnNew() {
        this.#destroyEvents();
        subPublish.publish(`${this.#selector}:DOM-changed`);
        goto("employee-page");
    }
    /**
     *
     * @param {int} id
     */

    async #handleBtnUpdate(id) {
        const employee = await this.#model.findById(id);

        this.#destroyEvents();
        subPublish.publish(`${this.#selector}:DOM-changed`);
        history.pushState(employee, "", `/${this.#selector}/${id}`);
        goto("employee-page", employee);
    }

    /**
     *
     * @param {int} id
     */
    async #handleSearch(e) {
        const keyword = e.target.value;
        this.#destroyEvents();
        await this.#loadData(keyword, "name");
    }

    /**
     *
     * @param {int} id
     */
    async #handleBtnDelete(id) {
        const data = await this.#model.findById(id);

        history.pushState({}, "", `/${this.#selector}/delete?id=${id}`);

        // eslint-disable-next-line no-undef
        if (data && confirm(`You want to remove an employee "${data.name}"`)) {
            this.#destroyEvents();
            await this.#model.deleteById(id);

            const employees = this.#employees.filter(
                (employee) => employee.id != id
            );

            this.#setEmployees(employees);
        }

        history.back();
    }

    #destroyEvents() {
        this.#destroyEventTbody();
        this.#destroyEventNew();
        this.#destroyEventSearch();
    }
    #destroyEventTbody() {
        const tbody = this.#view.getTbody();
        tbody.removeEventListener("click", this.#__initEventTbody);
    }
    #destroyEventSearch() {
        $(`${root} .${this.#selector} .form-search`)[
            "keyword"
        ].removeEventListener("keyup", this.#__initEventSearch);
    }

    #destroyEventNew() {
        $(`${root} .${this.#selector} .btn-add`).removeEventListener(
            "click",
            this.#__initEventNew
        );
    }
}

export { EmployeesCtrl };
