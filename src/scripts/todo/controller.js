import { TodoModel } from "./model";
import { TodoView } from "./view";

class TodoController {
    constructor(selector) {
        this.view = new TodoView(selector);
        this.model = new TodoModel();
    }

    async loadData() {
        const data = await this.model.findAll();
        this.setData(data);
    }

    setData(data) {
        this.todos = data;
        this.render();
        this.initEvents();
    }

    render() {
        this.view.render(this.todos);
    }

    initEvents() {}

    destroyEvents() {}
}

export { TodoController };
