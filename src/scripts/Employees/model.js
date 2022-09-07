import { API_ENDPOINT } from "../constant";

class EmployeesModel {
    findAll() {
        console.log(API_ENDPOINT)
    }
    search(keyword) {

    }
}
const model = new EmployeesModel();
export {
    model
}