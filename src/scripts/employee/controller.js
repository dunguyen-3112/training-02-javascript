import { EmployeeModel } from "./model";
import EmployeeView from "./view";

export default class EmployeeCtrl {
    constructor() {
        this.view = new EmployeeView();
        const employee = {
            id: null,
            address: null,
            email: null,
            gender: null,
            name: null,
            phone: null,
            status: null,
        };
        this.model = new EmployeeModel(employee);
    }

    OpenModal(title, employee) {
        this.view.openModal(title, employee);
    }
    render() {}
    initEvents() {
        this.initEventNew();
    }
    destroyEvents() {}

    initEventNew() {
        this.view.btnSave.addEventListener("click", this.handleSave.bind(this));
    }

    async handleSave(e) {
        e.preventDefault();
        console.log(this);
        const employee = {
            name: this.view.formNew.name.value,
            phone: this.view.formNew.phone.value,
            address: this.view.formNew.address.value,
            email: this.view.formNew.email.value,
            status: this.view.formNew.status.value === "active" ? true : false,
            gender: this.view.formNew.gender.value,
        };
        if (this.view.formNew.getAttribute("data-id"))
            employee.id = this.view.formNew.getAttribute("data-id");

        const data = await this.model.create(employee);
        location.reload();
    }
}
