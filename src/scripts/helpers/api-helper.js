import { API_BASE } from "../constant";

export default class API_Helper {
    constructor() {}
    /**
     *
     * @param {string} url
     * @param {*} option
     * @returns
     */
    fetchAPI = async ({ url, data, method }) => {
        let data1 = null;
        try {
            if (data) {
                const option = {
                    method,
                    headers: { "Content-Type": "application/json" },
                };
                if (method !== "DELETE") option.body = JSON.stringify(data);
                data1 = await fetch(`${url}`, option);
            } else data1 = await fetch(`${url}`);
            return data1.json();
        } catch (error) {
            console.log("Fetch API: ", error.message);
            throw error;
        }
    };
}
