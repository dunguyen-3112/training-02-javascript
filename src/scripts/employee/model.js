import { API_ENDPOINT } from "../employees/constant";
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

    isChanged(employee) {
        return (
            employee.name === this.name &&
            employee.email === this.email &&
            employee.status === this.status &&
            employee.gender === this.gender &&
            employee.address === this.address &&
            employee.status === this.status
        );
    }
}
class EmployeeModel {
    #helper;
    #employee;
    constructor() {
        this.#helper = new API_Helper();
    }

    /**
     *
     * @param {Employee} employee
     * @returns {Employee} employee
     */
    create(employee) {
        try {
            return this.#helper.fetchAPI({
                url: `${API_ENDPOINT}`,
                method: "POST",
                data: employee,
            });
        } catch (error) {
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
    update(employee) {
        try {
            return this.#helper.fetchAPI({
                url: `${API_ENDPOINT}/${employee.id}`,
                method: "PUT",
                data: employee,
            });
        } catch (error) {
            const err = {
                message: error.message,
                detail: `Not Found for employee with id ${Employee.id}`,
            };

            throw err;
        }
    }
    /**
     *
     * @param {int} id
     * @returns
     */
    async findById(id) {
        try {
            const employee = await this.#helper.fetchAPI({
                url: `${API_ENDPOINT}/${id}`,
            });

            return employee;
        } catch (error) {
            const err = {
                message: error.message,
                detail: `Not Found for employee with id ${Employee.id}`,
            };

            throw err;
        }
    }
}

export { EmployeeModel, Employee };
