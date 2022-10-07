import { EmployeesModel } from "./model";
import EmployeesView from "./view";
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
        this.view.tbody.innerHTML = "";
        console.log("clear");
        this.data.forEach((employee, index) => {
            this.renderRow({ employee, index });
        });
    }
    initEvents() {
        console.log("initEvents");
        this.initEventDelete();
        this.initEventUpdate();
        this.initEventNew();
        this.initEventSearch();
        this.initEventTodo();
    }
    destroyEvents() {
        console.log("destroyEvents");
        this.destroyEventDelete();
        this.destroyEventUpdate();
        this.destroyEventNew();
        this.destroyEventSearch();
        this.destroyEventTodo();
    }
    destroyEventSearch() {
        this.view.formSearch["keyword"].removeEventListener(
            "keyup",
            this.__initEventSearch
        );
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
    initEventTodo() {
        this._initEventTodo = this.handleTodo.bind(this);
        this.view.rows().forEach((element) => {
            element.addEventListener("dblclick", this._initEventTodo);
        });
    }
    destroyEventTodo() {
        this.view.rows().forEach((element) => {
            element.removeEventListener("dblclick", this._initEventTodo);
        });
    }
    handleTodo(e) {
        const id = e.path[1].getAttribute("data-id");
        goto("todo-page", id);
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
    destroyEventNew() {
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

    handleSearch = async (e) => {
        const keyword = e.target.value;
        this.destroyEvents();
        if (keyword.trim() === "") await this.render();
        else {
            const data = await this.model.search(keyword);
            await this.render(data);
        }
        this.initEvents();
    };
    async handleBtnDelete(e) {
        const id = e.path[2].getAttribute("data-id");

        const data = await this.model.findById(id);
        // eslint-disable-next-line no-undef
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
