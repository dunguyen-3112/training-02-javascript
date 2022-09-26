import { API_ENDPOINT } from "../Employees/constant";
import API_Helper from "../helpers/api-helper";

const helper = new API_Helper();

class EmployeeModel {
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
     * @returns Employee
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
