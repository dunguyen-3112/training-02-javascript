import EmployeesCtrl from "./Employees/controller";
import { Employee, Employees } from "./Employees/model";
import EmployeesView from "./Employees/view";

class main {
    /**
     *
     * @param  {EmployeesCtrl} ctrl
     */
    constructor() {
        new EmployeesCtrl(
            new Employee(),
            new Employees(),
            new EmployeesView("employees")
        );
    }
}

new main();
