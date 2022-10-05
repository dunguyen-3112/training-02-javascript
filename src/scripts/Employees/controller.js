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
        this.initEventDelete();
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
            element
                .querySelectorAll("button")[0]
                .addEventListener("click", this.handleBtnDelete.bind(this));
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

    initEventNew() {
        $(`${rootSelector} .${this.view.selector} .btn-add`).addEventListener(
            "click",
            this.handleBtnNew.bind(this)
        );
    }
    handleBtnNew() {
        console.log(this.view.numberRows());
        goto("employee-page", {
            employee: null,
            index: this.view.numberRows(),
            selectorTableEmployee: `${rootSelector} .${this.view.selector} table.${selectorTableEmployee} tbody`,
            _initEvents: this.initEventDelete.bind(this),
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
    async handleBtnDelete(e) {
        const id = e.path[2].getAttribute("data-id");
        try {
            const data = await this.model.findById(id);
            if (
                data &&
                confirm(`You want to remove an employee "${data.name}"`)
            ) {
                try {
                    const d = await this.model.deleteById(id);
                    if (d != undefined) {
                        this.destroyEventDelete(e.path[2]);
                        //this.destroyEventUpdate(e.path[2]);
                        const rows = e.path[3].rows,
                            len = rows.length,
                            index = e.path[2].rowIndex;
                        for (let i = index; i < len; i++) {
                            rows[i].cells[0].innerHTML = i - 1;
                        }
                        e.path[2].remove();
                    } else {
                        console.log(
                            "Error: ",
                            "Failed to internet connection..."
                        );
                    }
                } catch (error) {
                    throw error;
                }
            } else
                console.log(
                    "Couldn't findById or failed  to internet connection"
                );
        } catch (error) {
            console.log("Error: " + error.message);
        }
    }
    destroyEventDelete(element) {
        console.log("destroyEventDelete");
        element
            .querySelectorAll("button")[0]
            .removeEventListener("click", this.handleBtnDelete);
    }
}
export { EmployeesCtrl };
