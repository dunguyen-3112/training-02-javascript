import { Employee, EmployeeModel } from "../Employee/model";

export default class EmployeesModel {
    constructor() {
        this.model = new EmployeeModel();
    }

    /**
     * @returns {...Array<Employee>}
     */
    findAll() {
        return this.model.fetchAPI("");
    }
    search(keyword) {}
}