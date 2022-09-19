import { Employees, Employee } from "./model";
import EmployeesView from "./view";

export default class EmployeesCtrl {
    /**
     *
     * @param {Employee} employee
     * @param {Employees} employee
     * @param {EmployeesView} view
     */
    constructor(employee, employees, view) {
        this.employee = employee;
        this.employees = employees;
        this.view = view;
    }

    render = async () => {
        await this.employees.findAll().then((data) => {
            this.view.renderTable(data);
        });
    };
    async initEvents() {
        this.view.formSearch.keyword.addEventListener("keyup", (e) => {
            this.handleSearch(e.target.value);
        });

        this.view.btnAdd.addEventListener("click", (e) => {
            this.view.openModal("Add new Employee");
        });

        let elements = this.view.tbody.querySelectorAll("tr");
        for (let i = 0; i < elements.length; i++) {
            elements[i]
                .querySelectorAll("button")[0]
                .addEventListener("click", this.handleBtnDelete);
            elements[i]
                .querySelectorAll("button")[1]
                .addEventListener("click", this.handleBtnUpdate);
        }

        this.view.form.btnSave.addEventListener("click", this.handleSave);
    }

    handleSave = (e) => {
        e.preventDefault();

        const inputs = this.view.handleSubmit();
        if (inputs.id != null)
            this.employee.update(inputs).then(async (data) => {
                if (data) {
                    await this.destroyEvents();
                    await this.render();
                    await this.initEvents();
                }
            });
        else
            this.employee.create(inputs).then(async (data) => {
                if (data) {
                    await this.destroyEvents();
                    await this.render();
                    await this.initEvents();
                }
            });
    };
    async destroyEvents() {
        this.view.form.btnSave.removeEventListener("click", (e) =>
            this.handleSave(e)
        );
        let elements = this.view.tbody.querySelectorAll("tr");
        for (let i = 0; i < elements.length; i++) {
            elements[i]
                .querySelectorAll("button")[0]
                .removeEventListener("click", this.handleBtnDelete);
            elements[i]
                .querySelectorAll("button")[1]
                .removeEventListener("click", this.handleBtnUpdate);
        }
    }
    handleSearch = (keyword) => {
        if (keyword.trim() === "") this.render();
        else
            this.employees.search(keyword).then((data) => {
                this.view.renderTable(data);
            });
    };
    handleBtnDelete = async (e) => {
        const id = e.path[2].getAttribute("data-id");
        await this.employees.findById(id).then((data) => {
            if (confirm(`You want to remove an employee "${data.name}"`))
                this.employees.deleteById(id).then(async (data) => {
                    await this.destroyEvents();
                    await this.render();
                    await this.initEvents();
                });
        });
    };

    handleBtnUpdate = async (e) => {
        const id = e.path[2].getAttribute("data-id");
        this.employees
            .findById(id)
            .then((data) => this.view.openModal("Update Employee", data));
    };

    run = async () => {
        await this.render();
        this.initEvents();
    };
}
