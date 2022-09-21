import EmployeesCtrl from "./Employees/controller";
import { Employee, Employees } from "./Employees/model";
import EmployeesView from "./Employees/view";
import { HomepageView } from "./Homepage/view";
import HomepageCtrl from "./Homepage/controller";
import HomepageModel from "./Homepage/model";
import { $ } from "./constant";
import LoginCtrl from "./login.html/controller";
import LoginModel from "./login.html/model";
import LoginView from "./login.html/view";
class main {
    /**
     *
     * @param  {EmployeesCtrl} ctrl
     */
    constructor() {
        new HomepageCtrl(new HomepageModel(), new HomepageView("demo"));
        this.redirect();
    }
    redirect() {
        let selectors = $(".navigation").querySelectorAll("a"),
            counter = selectors.length;
        for (let i = 0; i < counter; i++) {
            selectors[i].addEventListener("click", (e) => {
                e.preventDefault();
                let href = e.target.href.split("/")[3],
                    preSelector = window.location.href.split("/")[3];

                window.history.pushState(
                    "object or string",
                    "Title",
                    `/${href}`
                );

                if (href == "employees") {
                    new EmployeesCtrl(
                        new Employee(),
                        new Employees(),
                        new EmployeesView(preSelector, href)
                    );
                }
                if (href == "logout") {
                    new LoginCtrl(new LoginModel(), new LoginView());
                }
            });
        }
    }
}

new main();
