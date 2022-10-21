import API_Helper from "../helpers/api-helper";
import { API_ENDPOINT } from "./constant";

const api_helper = new API_Helper();
class Todo {
    constructor({ id, uid, name, status, date }) {
        Object.assign(this, { id, uid, name, status, date });
    }
    getDate() {
        return this.date.toISOString().substring(0, 10);
    }
}
class TodoModel {
    constructor() {}

    findById(id) {
        return api_helper.fetchAPI({
            url: `${API_ENDPOINT}?uid=${id}`,
        });
    }
}

export { TodoModel, Todo };
