import { API_ENDPOINT } from "./constant";
import API_Helper from "../helpers/api-helper";

const helper = new API_Helper();

class EmployeesModel {
    constructor() {}

    /**
     * @returns {...Array<Employee>}
     */
    async findAll() {
        const employees = await helper.fetchAPI({ url: `${API_ENDPOINT}` });
        return employees;
    }
    /**
     *
     * @param {string} keyword
     */
    search(filter, property) {
        const employees = helper.fetchAPI({
            url: `${API_ENDPOINT}?${property}_like=${filter}`,
        });
        return employees;
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
     * @param {int} id
     * @returns
     */
    findById(id) {
        return helper.fetchAPI({ url: `${API_ENDPOINT}/${id}` });
    }
}

export { EmployeesModel };
