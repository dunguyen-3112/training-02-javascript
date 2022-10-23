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
        try {
            const employees = await helper.fetchAPI({
                url: `${API_ENDPOINT}?_page=${page}`,
            });
            return employees;
        } catch (error) {
            const err = {
                message: "Error connection internet!",
                detail: error.message,
            };
            throw err;
        }
    }
    /**
     *
     * @param {String} filter
     * @param {String} property
     * @returns Array<Employee>
     */
    search(filter, page) {
        try {
            const url = page
                ? `${API_ENDPOINT}?name_like=${filter}&_page=${page}`
                : `${API_ENDPOINT}?name_like=${filter}`;
            const employees = helper.fetchAPI({
                url,
            });
            return employees;
        } catch (error) {
            const err = {
                message: "Error connection internet!",
                detail: error.message,
            };
            throw err;
        }
    }
    /**
     *
     * @param {int} id
     * @returns
     */
    deleteById(id) {
        try {
            return helper.fetchAPI({
                url: `${API_ENDPOINT}/${id}`,
                method: "DELETE",
                data: id,
            });
        } catch (error) {
            const err = {
                message: "Error connection internet!",
                detail: error.message,
            };
            throw err;
        }
    }
    /**
     *
     * @param {int} id
     * @returns Employee
     */
    findById(id) {
        try {
            return helper.fetchAPI({ url: `${API_ENDPOINT}/${id}` });
        } catch (error) {
            const err = {
                message: "Error connection internet!",
                detail: error.message,
            };
            throw err;
        }
    }

    async getCountEmployees() {
        try {
            const employees = await this.findAll();
            return employees.length;
        } catch (error) {
            const err = {
                message: "Error connection internet!",
                detail: error.message,
            };
            throw err;
        }
    }
}

export { EmployeesModel };
