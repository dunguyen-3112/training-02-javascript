import EmployeesCtrl from "./Employees/controller";
import { EmployeesModel } from "./Employees/model";
import EmployeesView from "./Employees/view";

class main {
    /**
     *
     * @param  {EmployeesCtrl} ctrl
     */
    constructor(ctrl) {
        this.ctrl = ctrl;
        this.ctrl.run();
    }
}
new main(new EmployeesCtrl(new EmployeesModel(), new EmployeesView()));