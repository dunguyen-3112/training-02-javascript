/* eslint-disable no-undef */
import { EmployeesModel } from "./model";
import EmployeesView from "./view";
import { goto } from "../helpers/routes-helper";
import { subPublish } from "../helpers/state-manager";
// eslint-disable-next-line no-unused-vars
import { Employee } from "../employee/model";
import { $, rootSelector as root } from "../constant";
import { PaginationController } from "../pagination/controller";
import { HomePageModel } from "../home-page/model";

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
    #pageC = 0;
    #managerStates = [];
    #metaModel;

    /**
     *
     * @param {String} selector
     */
    constructor(selector) {
        this.#selector = selector;
        this.#view = new EmployeesView(selector);
        this.#paginationController = new PaginationController(selector);
        this.#metaModel = new HomePageModel();

        this.#managerStates = [
            {
                event: `${this.#selector}:init`,
                callback: () => {
                    this.#initEvents();
                },
            },

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
    async #loadData() {
        try {
            const filter = this.#view.getFormSearch().value.trim();

            let employees = null;

            if (filter.localeCompare("") !== 0) {
                employees = await this.#model.search(filter);
                this.#pageC = Math.ceil(employees.length / 10);
                employees = employees.slice(
                    (this.#currentPage - 1) * 10,
                    this.#currentPage * 10
                );
            } else {
                employees = await this.#model.findAll(this.#currentPage);

                this.#pageC = Math.ceil(
                    (await (await this.#metaModel.getMeta()).employeeC) / 10
                );
            }
            this.#setEmployees(employees);
        } catch (error) {
            console.log(error);
        }
    }

    #setCurrentPage(currentPage) {
        if (this.#currentPage !== currentPage) {
            this.#currentPage = currentPage;
            this.#view.templateLoader();
            this.#loadData();
        }
    }

    /**
     *
     * @param {Array<Employee>} employees
     */
    #setEmployees(employees) {
        this.#employees = employees;
        this.render();
        this.#initEvents();
    }

    render() {
        // if employees is not empty then display else fetch data
        if (this.#employees.length > 0) {
            this.#destroyEvents();
            this.#view.template(this.#employees);
            return;
        } else if (
            this.#view.getFormSearch().value.trim().localeCompare("") === 0
        ) {
            this.#view.templateLoader();
            this.#loadData();
        } else {
            this.#view.templateNotFound();
        }
    }

    #initEvents() {
        this.#initEventTbody();
        this.#initEventNew();
        this.#initEventSearch();
        subPublish.publish(`${this.#selector}:DOM-changed`, this.#pageC);
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
        goto("employee-page");
    }
    /**
     *
     * @param {int} id
     */

    async #handleBtnUpdate(id) {
        this.#destroyEvents();
        history.pushState(null, "", `/${this.#selector}/${id}`);
        goto("employee-page", id);
    }

    /**
     *
     * @param {int} id
     */
    async #handleSearch(e) {
        this.#destroyEvents();
        this.#currentPage = 1;
        await this.#loadData();
    }

    /**
     *
     * @param {int} id
     */
    async #handleBtnDelete(id) {
        try {
            const data = await this.#model.findById(id);

            history.pushState({}, "", `/${this.#selector}/delete?id=${id}`);

            // eslint-disable-next-line no-undef
            if (
                data &&
                confirm(`You want to remove an employee "${data.name}"`)
            ) {
                this.#destroyEvents();
                await this.#model.deleteById(id);
                await this.#metaModel.update("employees", -1);

                const employees = this.#employees.filter(
                    (employee) => employee.id != id
                );

                this.#setEmployees(employees);
            }

            history.back();
        } catch (error) {
            console.log(error);
        }
    }

    #destroyEvents() {
        this.#destroyEventTbody();
        this.#destroyEventNew();
        this.#destroyEventSearch();
        subPublish.publish(`${this.#selector}:DOM`);
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
