import { EmployeesModel } from "./model";
import EmployeesView from "./view";

export default class EmployeesCtrl {
    /**
     *
     * @param  {String} rootSelector
     */
    constructor(rootSelector) {
        this.model = new EmployeesModel();
        this.view = new EmployeesView(rootSelector);
    }

    async render() {
        const data = await this.model.findAll();
        this.view.renderTable(data);
    }

    initEventSearch() {
        this.view.formSearch.keyword.addEventListener("keyup", (e) => {
            this.handleSearch(e.target.value);
        });
    }
    initEventNew() {
        this.view.btnModalNew.addEventListener("click", (e) => {
            this.view.openModal("Add new Employee");
        });
    }
    initEventUpdate(elements) {
        elements.forEach((element) => {
            element
                .querySelectorAll("button")[1]
                .addEventListener("click", this.handleBtnUpdate);
        });
    }
    initEventDelete(elements) {
        elements.forEach((element) => {
            element
                .querySelectorAll("button")[0]
                .addEventListener("click", this.handleBtnDelete);
        });
    }
    initEvents() {
        const elements = this.view.tbody.querySelectorAll("tr");

        this.initEventDelete(elements);
        this.initEventNew();
        this.initEventSearch();
        this.initEventUpdate(elements);
        console.log(this.view.formNew);
        this.view.formNew.btnSave.addEventListener("click", this.handleSave);
    }

    destroyEventSave() {
        this.view.form.btnSave.removeEventListener("click", (e) =>
            this.handleSave(e)
        );
    }
    destroyEventDelete(elements) {
        elements.forEach((element) => {
            element
                .querySelectorAll("button")[0]
                .removeEventListener("click", this.handleBtnDelete);
        });
    }
    destroyEventUpdate(elements) {
        elements.forEach((element) => {
            element
                .querySelectorAll("button")[1]
                .removeEventListener("click", this.handleBtnUpdate);
        });
    }
    destroyEvents() {
        this.destroyEventDelete(elements);
        this.destroyEventUpdate(elements);
        this.destroyEventSave(elements);
    }
    handleSave = (e) => {
        e.preventDefault();

        const inputs = this.view.handleSubmit();
        if (inputs?.id != null)
            this.employee.update(inputs).then(async (data) => {
                if (data) {
                    this.destroyEvents();
                    await this.render();
                    this.initEvents();
                }
            });
        else
            this.employee.create(inputs).then(async (data) => {
                if (data) {
                    this.destroyEvents();
                    await this.render();
                    this.initEvents();
                }
            });
    };
    handleSearch = (keyword) => {
        if (keyword.trim() === "") this.render();
        else
            this.model.search(keyword).then((data) => {
                this.view.renderTable(data);
            });
    };
    handleBtnDelete = (e) => {
        const id = e.path[2].getAttribute("data-id");
        this.model.findById(id).then((data) => {
            if (confirm(`You want to remove an employee "${data.name}"`))
                this.model.deleteById(id).then(async (data) => {
                    if (data) {
                        this.view.showMessage("Delete Employee Success!");
                        this.destroyEvents();
                        await this.render();
                        this.initEvents();
                    }
                });
        });
    };

    handleBtnUpdate = async (e) => {
        const id = e.path[2].getAttribute("data-id");
        this.model
            .findById(id)
            .then((data) => this.view.openModal("Update Employee", data));
    };

    async run() {
        await this.render();
        this.initEvents();
    }
}
