class SubPub {
    #events = {};
    constructor() {}

    getEvents() {
        return this.#events;
    }

    /**
     *
     * @param {String} event
     * @param {function} callback
     * @returns
     */
    subscribe({ event, callback }) {
        if (!this.#events.hasOwnProperty(event)) {
            this.#events[event] = [];
        }
        this.#events[event].push(callback);
    }

    clear(event) {
        if (this.#events.hasOwnProperty(event)) this.#events[event] = [];
    }

    /**
     *
     * @param {String} event
     * @param {any} data
     */
    publish(event, data = {}) {
        if (!this.#events.hasOwnProperty(event)) return;
        this.#events[event].map((callback) => callback(data));
    }
}
const subPublish = new SubPub();
export { subPublish };
