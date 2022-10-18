import API_Helper from "../helpers/api-helper";
import { API_ENDPOINT } from "./constant";

class TodoModel {
    constructor() {
        this.api_helper = new API_Helper();
    }

    findAll() {
        return this.api_helper.fetchAPI({
            url: `${API_ENDPOINT}`,
        });
    }
}

export { TodoModel };
