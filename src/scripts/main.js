import EmployeeCtrl from "./Employee/controller";
import { EmployeeModel } from "./Employee/model";
import EmployeeView from "./Employee/view";
import EmployeesCtrl from "./Employees/controller";
import EmployeesModel from "./Employees/model";
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
new main(
    new EmployeesCtrl(
        new EmployeesModel(),
        new EmployeesView(),
        new EmployeeCtrl(new EmployeeModel(), new EmployeeView())
    )
);