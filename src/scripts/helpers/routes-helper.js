/* eslint-disable no-undef */
import { EmployeeCtrl } from "../employee/controller";
import { EmployeesCtrl } from "../employees/controller";
import { HomePageController } from "../home-page/controller";
import { LoginController } from "../login/controller";
import { NavigationController } from "../navigation/controller";
import { TodoCtrl } from "../todo/ctrl";
async function goto(page, params) {
    try {
        let ctrl = null;

        switch (page) {
            case "home-page":
                ctrl = new HomePageController(page);
                break;
            case "todo-page":
                ctrl = new TodoCtrl(page, params);
                ctrl.render();
                ctrl.initEvents();
                break;
            case "login-page":
                ctrl = new LoginController("login-page");

                if (!(await ctrl.checkLogin())) ctrl.render();
                else {
                    const nav = new NavigationController("navigation");
                    nav.render();
                    goto("home-page");
                }
                break;

            case "employee-page":
                ctrl = new EmployeeCtrl(page);
                ctrl.setEmployee(params);
                break;
            case "employees-page":
                ctrl = new EmployeesCtrl(page);
                await ctrl.getEmployees();
                break;

            default:
                document.cookie = "_token=";
                goto("login-page");
                break;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export { goto };
