import { EmployeesModel } from "../employees/model";
import { CookiesHelper } from "../helpers/cookies-helper";
import { TodoModel } from "../todo/model";

class HomePageModel {
    #employeesModel;
    #todoModel;
    #cookieHeader;
    constructor() {
        this.#employeesModel = new EmployeesModel();
        this.#todoModel = new TodoModel();
        this.#cookieHeader = new CookiesHelper();
    }

    async getCountEmployees() {
        const employees = await this.#employeesModel.findAll();
        return employees.length;
    }

    async getCountTodos() {
        const id = this.#cookieHeader.get("_uid");
        const todos = await this.#todoModel.findById(id);
        return todos.length;
    }
}

export { HomePageModel };
