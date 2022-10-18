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
async function goto(page, params) {
    try {
        let ctrl = null;

        switch (page) {
            case "home-page":
                goto("login-page");
                break;
            case "todo-page":
                ctrl = new TodoController(page);
                subPublish.subscribe("todo-page", () => {
                    ctrl.destroyEvents();
                });
                ctrl.loadData();
                break;
            case "login-page":
                ctrl = new LoginController("login-page");
                history.pushState({}, "", `/${page}`);
                await ctrl.loadData();
                break;

            case "employee-page":
                ctrl = new EmployeeCtrl(page);
                ctrl.setEmployee(params);
                break;
            case "employees-page":
                ctrl = new EmployeesCtrl(page);
                await ctrl.loadData();
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
