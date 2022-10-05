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
        try {
            if (data) {
                const option = {
                    method,
                    headers: { "Content-Type": "application/json" },
                };
                if (method !== "DELETE") option.body = JSON.stringify(data);
                return (await fetch(`${url}`, option)).json();
            }
            return (await fetch(`${url}`)).json();
        } catch (error) {
            console.log("Fetch API: ", error.message);
            //throw error;
        }
    };
}
