import { API_ENDPOINT } from "./constant";
import API_Helper from "../helpers/api-helper";
class LoginModel {
    #api;
    constructor() {
        this.#api = new API_Helper();
    }

    async checkLogin(token) {
        try {
            const data = await this.#api.fetchAPI({
                url: `${API_ENDPOINT}?_token=${token}`,
            });
            return {
                id: data[0].id,
                isLogin: data[0].isLogin,
                name: data[0].name,
            };
        } catch (error) {
            const err = {
                message: "ERROR connection internet!",
                detail: error.message,
            };
            throw err;
        }
    }
    async login(username, password) {
        try {
            const data = await this.#api.fetchAPI({
                url: `${API_ENDPOINT}?username=${username}&password=${password}`,
            });
            return data[0];
        } catch (error) {
            const err = {
                message:
                    "Login not successful!The username or password invalid.",
                detail: error.message,
            };
            throw err;
        }
    }
    async update(user) {
        try {
            const data = await this.#api.fetchAPI({
                url: `${API_ENDPOINT}/${user.id}`,
                data: user,
                method: "PUT",
            });
            return data;
        } catch (error) {
            const err = {
                message: "ERROR connection internet!",
                detail: error.message,
            };
            throw err;
        }
    }
}
export { LoginModel };
