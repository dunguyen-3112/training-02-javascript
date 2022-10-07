import { EmployeeCtrl } from "../employee/controller";
import { EmployeesCtrl } from "../employees/controller";
import { LoginController } from "../Login/controller";
import { TodoCtrl } from "../todo/ctrl";
async function goto(page, params) {
    let ctrl = null;
    if (page === "employees-page") {
        ctrl = new EmployeesCtrl(page);
        await ctrl.render();
        ctrl.initEvents();
    } else if (page === "login-page") {
        const check = await params.ctrl.render();
        if (check) {
            goto("employees-page");
        }
    } else if (page === "employee-page") {
        ctrl = new EmployeeCtrl(page);
        if (params?.employee) {
            ctrl.render("update", params);
        } else if (params?.selectorTableEmployee) ctrl.render("row", params);
        else {
            ctrl.render("new", params);
        }
    } else {
        ctrl = new TodoCtrl(page, params);
        ctrl.render();
        ctrl.initEvents();
    }
}
export { goto };
