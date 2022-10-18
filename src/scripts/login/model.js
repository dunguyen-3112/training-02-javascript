import { API_ENDPOINT } from "./constant";
import API_Helper from "../helpers/api-helper";
class LoginModel {
    constructor() {
        this.api = new API_Helper();
    }

    async checkLogin(token) {
        try {
            const data = await this.api.fetchAPI({
                url: `${API_ENDPOINT}?_token=${token}`,
            });
            return { id: data[0].id, isLogin: data[0].isLogin };
        } catch (error) {
            console.log("GetUser: ", error.message);
            throw error;
        }
    }
    async login(username, password) {
        try {
            const data = await this.api.fetchAPI({
                url: `${API_ENDPOINT}?username=${username}&password=${password}`,
            });
            return data[0];
        } catch (error) {
            console.log("object");
            throw error;
        }
    }
    async update(user) {
        const data = await this.api.fetchAPI({
            url: `${API_ENDPOINT}/${user.id}`,
            data: user,
            method: "PUT",
        });
        return data;
    }
}
export { LoginModel };
