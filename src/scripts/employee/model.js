import { API_ENDPOINT } from "../Employees/constant";
import API_Helper from "../helpers/api-helper";

class Employee {
    constructor({ id, name, email, phone, status, gender, address }) {
        Object.assign(this, {
            id,
            name,
            email,
            phone,
            status,
            gender,
            address,
        });
    }
}
class EmployeeModel {
    #helper;
    constructor() {
        this.#helper = new API_Helper();
    }
    /**
     *
     * @param {Employee} Employee
     * @returns {Employee} Employee
     */
    create(Employee) {
        try {
            return this.#helper.fetchAPI({
                url: `${API_ENDPOINT}`,
                method: "POST",
                data: Employee,
            });
        } catch (error) {
            console.log("Create employee failed: " + error.message);
            throw {
                message: error.message,
                detail: `ERROR connection to ${API_ENDPOINT} failed`,
            };
        }
    }
    /**
     *
     * @param {Employee} employee
     * @returns Employee
     */
    update(Employee) {
        try {
            return this.#helper.fetchAPI({
                url: `${API_ENDPOINT}/${Employee.id}`,
                method: "PUT",
                data: Employee,
            });
        } catch (error) {
            const err = {
                message: error.message,
                detail: `Not Found for employee with id ${Employee.id}`,
            };
            console.log(err);
            throw err;
        }
    }
    /**
     *
     * @param {int} id
     * @returns
     */
    findById(id) {
        try {
            return this.#helper.fetchAPI({ url: `${API_ENDPOINT}/${id}` });
        } catch (error) {
            console.log("object");
            throw error;
        }
    }
}

export { EmployeeModel, Employee };
