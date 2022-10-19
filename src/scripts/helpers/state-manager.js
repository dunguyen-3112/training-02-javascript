/* eslint-disable no-undef */
/* eslint-disable no-prototype-builtins */
class SubPub {
    constructor() {
        this.events = {};
    }

    /**
     *
     * @param {String} event
     * @param {function} callback
     * @returns
     */
    subscribe(event, callback) {
        if (!this.events.hasOwnProperty(event)) {
            this.events[event] = [];
        }
        return this.events[event].push(callback);
    }

    clear(route, event) {
        if (event) {
            this.events[`${route}:${event}`] = [];
            return;
        }
        const _events = JSON.parse(localStorage.getItem(route))?.events;

        _events?.forEach((event) => {
            if (this.events.hasOwnProperty(`${route}:${event}`)) {
                this.events[`${route}:${event}`] = [];
            }
        });
    }

    /**
     *
     * @param {String} event
     * @param {any} data
     */
    publish(event, data = {}) {
        if (!this.events.hasOwnProperty(event)) return [];
        return this.events[event].map((callback) => callback(data));
    }
}
const subPublish = new SubPub();
export { subPublish };
