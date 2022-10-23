import { API_ENDPOINT } from "./constant";
import API_Helper from "../helpers/api-helper";
// eslint-disable-next-line no-unused-vars
import { Employee } from "../employee/model";

const helper = new API_Helper();

class EmployeesModel {
    constructor() {}

    /**
     * @returns {...Array<Employee>}
     */
    async findAll(page) {
        const employees = await helper.fetchAPI({
            url: `${API_ENDPOINT}?_page=${page}`,
        });
        return employees;
    }
    /**
     *
     * @param {String} filter
     * @param {String} property
     * @returns Array<Employee>
     */
    search(filter, page) {
        const url = page
            ? `${API_ENDPOINT}?name_like=${filter}&_page=${page}`
            : `${API_ENDPOINT}?name_like=${filter}`;
        const employees = helper.fetchAPI({
            url,
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
     * @returns Employee
     */
    findById(id) {
        return helper.fetchAPI({ url: `${API_ENDPOINT}/${id}` });
    }

    async getCountEmployees() {
        const employees = await this.findAll();
        return employees.length;
    }
}

export { EmployeesModel };
