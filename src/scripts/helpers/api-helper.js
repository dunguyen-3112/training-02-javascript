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
        if (data) {
            const option = {
                method,

                headers: { "Content-Type": "application/json" },
            };
            if (method !== "DELETE") option.body = JSON.stringify(data);
            const data1 = await fetch(`${url}`, option);
            return data.json();
        }
        const data1 = await fetch(`${url}`);
        return data1.json();
    };
}
