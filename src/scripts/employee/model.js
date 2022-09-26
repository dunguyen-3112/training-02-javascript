import { API_ENDPOINT } from "./constant";
import API_Helper from "../helpers/api-helper";

const helper = new API_Helper();

class EmployeeModel {
    constructor(id = null, name, email, phone, status, gender, address) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.status = status;
        this.gender = gender;
        this.address = address;
    }
    /**
     *
     * @param {Employee} Employee
     * @returns {Employee} Employee
     */
    create(Employee) {
        return helper.fetchAPI({
            url: `${API_ENDPOINT}`,
            method: "POST",
            data: Employee,
        });
    }
    /**
     *
     * @param {Employee} employee
     * @returns Promise<Employee>
     */
    update(Employee) {
        return helper.fetchAPI({
            url: `${API_ENDPOINT}/${Employee.id}`,
            method: "PUT",
            data: Employee,
        });
    }
    validate(Employee) {}
}

export { EmployeeModel };
