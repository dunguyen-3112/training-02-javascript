import { API_ENDPOINT } from "./constant";
import API_Helper from "../helpers/api-helper";

const helper = new API_Helper();

class EmployeesModel {
    constructor() {}

    /**
     * @returns {...Array<Employee>}
     */
    async findAll() {
        return await helper.fetchAPI({ url: `${API_ENDPOINT}` });
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

export { Employee, EmployeesModel };
