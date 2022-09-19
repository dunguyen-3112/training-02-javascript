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
    initEvents() {
        this.view.inputSearch.addEventListener("keyup", (e) => {
            this.handleSearch(e.target.value);
        });
        const tbody = document.querySelector("tbody");

        let elements = tbody.querySelectorAll("tr");
        for (let i = 0; i < elements.length; i++) {
            elements[i]
                .querySelectorAll("button")[1]
                .addEventListener("click", (e) => {
                    this.handleBtnDelete(elements[i].getAttribute("data-id"));
                });
            elements[i]
                .querySelectorAll("button")[0]
                .addEventListener("click", (e) => {
                    this.handleBtnUpdate(elements[i].getAttribute("data-id"));
                });
        }
    }
    destroyEvents() {}
    handleSearch = (keyword) => {
        if (keyword.trim() === "") this.renderTable();
        else
            this.employees.search(keyword).then((data) => {
                this.view.displayTable(
                    data,
                    this.handleBtnDelete,
                    this.handleBtnUpdate
                );
            });
    };
    handleBtnDelete = (id) => {
        this.employees.findById(id).then((data) => {
            if (confirm(`You want to remove an employee "${data.name}"`))
                this.model.deleteById(id).then((data) => {
                    this.renderTable();
                });
        });
    };

    handleBtnUpdate = (id) => {
        this.employees.findById(id).then((data) => {
            this.view.openModal("Update Employee", data);
        });
    };

    run = async () => {
        await this.render();
        this.view.renderForm().then((form) => {
            document.body.innerHTML += form;
        });
        this.initEvents();

        this.view.btnAdd.addEventListener("click", (e) => {
            this.view.openModal("Add new Employee");
        });

        // this.view.form.btnSave.addEventListener("click", async (e) => {
        //     e.preventDefault();
        //     const inputs = this.view.handleSubmit();
        //     if (inputs.id != null)
        //         await this.employee.update(inputs).then((data) => data);
        //     else await this.employee.create(inputs).then((data) => data);
        //     this.renderTable();
        // });
    };
}
