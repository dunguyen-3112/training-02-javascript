import { API_ENDPOINT } from "./constant";
import API_Helper from "../helpers/api-helper";
class LoginModel {
    constructor() {
        this.api = new API_Helper();
    }

    async getUser(token) {
        const data = await this.api.fetchAPI({
            url: `${API_ENDPOINT}?_token=${token}`,
        });
        return data[0];
    }
    async login(username, password) {
        const data = await this.api.fetchAPI({
            url: `${API_ENDPOINT}?username=${username}&password=${password}`,
        });
        return data[0];
    }
}
export { LoginModel };
