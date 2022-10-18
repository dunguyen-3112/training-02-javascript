/* eslint-disable no-undef */
class CookiesHelper {
    constructor() {}
    get(attribute) {
        let cookies = document.cookie;
        cookies = cookies.split(";");
        const lenCookies = cookies.length;
        for (let i = 0; i < lenCookies; i++) {
            let [key, value] = cookies[i].trim().split("=");
            if (key.localeCompare(attribute) == 0) return value;
        }
    }
    set(key, value) {
        document.cookie = `${key}=${value};`;
    }
}
export { CookiesHelper };
