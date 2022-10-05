import { EmployeeCtrl } from "../employee/controller";
import { EmployeesCtrl } from "../employees/controller";
import { LoginController } from "../Login/controller";
async function goto(page, params) {
    console.log(page);
    try {
        if (page === "employees-page") {
            const ctrl = new EmployeesCtrl(page);
            ctrl.render();
        } else if (page === "login-page") {
            const check = await params.ctrl.render();
            if (check) {
                goto("employees-page");
            }
        } else if (page === "employee-page") {
            const ctrl = new EmployeeCtrl(page);
            if (params.employee === null) {
                ctrl.render("new", params);
            } else ctrl.render("row", params);
        }
    } catch (error) {
        console.log("Error: " + error.message);
    }
}
export { goto };
