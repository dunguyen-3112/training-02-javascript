/* eslint-disable no-undef */
import { EmployeeCtrl } from "../employee/controller";
import { EmployeesCtrl } from "../employees/controller";
import { LoginController } from "../login/controller";
import { TodoController } from "../todo/controller";
import { subPublish } from "./state-manager";

/**
 *
 * @param {String} page
 * @param {any} params
 */
function goto(page, params) {
    try {
        let ctrl = null;

        switch (page) {
            case "todo-page":
                ctrl = new TodoController(page);
                ctrl.render();
                break;
            case "login-page":
                ctrl = new LoginController("login-page");
                history.pushState({}, "", `/${page}`);
                ctrl.render();
                break;

            case "employee-page":
                ctrl = new EmployeeCtrl(page, params);
                ctrl.render();
                break;
            case "employees-page":
                ctrl = new EmployeesCtrl(page);
                ctrl.render();
                break;

            default:
                goto("login-page");
                break;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export { goto };
