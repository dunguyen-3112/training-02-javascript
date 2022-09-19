import { API_ENDPOINT } from "./constant";
import API_Helper from "../helpers/api-helper";

const helper = new API_Helper();
class Employee {
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
class Employees {
    constructor() {}

    /**
     * @returns {...Array<Employee>}
     */
    findAll() {
        return helper.fetchAPI({ url: `${API_ENDPOINT}` });
    }
    /**
     *
     * @param {string} keyword
     */
    search(keyword) {
        return helper.fetchAPI({ url: `${API_ENDPOINT}?name_like=${keyword}` });
    }
    /**
     *
     * @param {int} id
     * @returns
     */
    findById(id) {
        return helper.fetchAPI({ url: `${API_ENDPOINT}/${id}` });
    }

    /**
     *
     * @param {int} id
     * @returns
     */
    deleteById(id) {
        return helper.fetchAPI({
            url: `${API_ENDPOINT}/${id}`,
            method: "DELETE",
            data: id,
        });
    }
    /**
     *
     * @param {Employee} employee
     * @returns
     */
    validate(employee) {
        return true;
    }
}

export { Employee, Employees };
