import EmployeesCtrl from "./Employees/controller";
import { Employee, Employees } from "./Employees/model";
import EmployeesView from "./Employees/view";
import { HomepageView } from "./Homepage/view";
class main {
    /**
     *
     * @param  {EmployeesCtrl} ctrl
     */
    constructor(ctrl) {
        const hp = new HomepageView();
        this.ctrl = ctrl;
        this.ctrl.run();

        document.querySelector(".demo").innerHTML += hp.Nav();
    }
}

new main(
    new EmployeesCtrl(new Employee(), new Employees(), new EmployeesView())
);
