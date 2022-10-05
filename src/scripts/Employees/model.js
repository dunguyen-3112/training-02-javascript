import { API_ENDPOINT } from "./constant";
import API_Helper from "../helpers/api-helper";

const helper = new API_Helper();

class EmployeesModel {
    constructor() {}

    /**
     * @returns {...Array<Employee>}
     */
    async findAll() {
        try {
            return await helper.fetchAPI({ url: `${API_ENDPOINT}` });
        } catch (error) {
            console.log("123");
            throw error;
        }
    }
    /**
     *
     * @param {string} keyword
     */
    search(keyword) {
        try {
            return helper.fetchAPI({
                url: `${API_ENDPOINT}?name_like=${keyword}`,
            });
        } catch (error) {
            throw error;
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
            throw error;
        }
    }
    /**
     *
     * @param {int} id
     * @returns
     */
    findById(id) {
        try {
            return helper.fetchAPI({ url: `${API_ENDPOINT}/${id}` });
        } catch (error) {
            throw error;
        }
    }
}

export { EmployeesModel };
