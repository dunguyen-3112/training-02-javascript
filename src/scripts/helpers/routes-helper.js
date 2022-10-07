import { EmployeeCtrl } from "../employee/controller";
import { EmployeesCtrl } from "../employees/controller";
import { LoginController } from "../Login/controller";
async function goto(page, params) {
    if (page === "employees-page") {
        const ctrl = new EmployeesCtrl(page);
        await ctrl.render();
        ctrl.initEvents();
    } else if (page === "login-page") {
        const check = await params.ctrl.render();
        if (check) {
            goto("employees-page");
        }
    } else if (page === "employee-page") {
        const ctrl = new EmployeeCtrl(page);
        if (params?.employee) {
            ctrl.render("update", params);
        } else if (params?.selectorTableEmployee) ctrl.render("row", params);
        else {
            ctrl.render("new", params);
        }
    }
}
export { goto };
