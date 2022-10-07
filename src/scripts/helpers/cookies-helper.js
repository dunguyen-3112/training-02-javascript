/* eslint-disable no-undef */
class CookiesHelper {
    constructor() {}
    get(attribute) {
        const cookies = document.cookie;
        for (let cookie of cookies.split(";")) {
            let [key, value] = cookie.split("=");
            if (key === attribute) return value;
        }
    }
    set(key, value) {
        document.cookie = `${key}=${value};`;
    }
}
export { CookiesHelper };
