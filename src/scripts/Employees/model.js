import { API_ENDPOINT } from "../constant";
class Employee {
    constructor(id = null, name, email, phone, status, gender, address) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.status = status;
        this.gender = gender;
        this.address = address;
    }
}
class EmployeesModel {
    constructor() {}

    async fetchAPI(href = "", option) {
            if (option)
                return await fetch(`${API_ENDPOINT}/${href}`, option).then(
                    (res) => res
                );
            return await fetch(`${API_ENDPOINT}/${href}`).then((res) => res.json());
        }
        /**
         * @returns {...Array<Employee>}
         */
    findAll() {
        return this.fetchAPI("");
    }
    search(keyword) {
            return this.fetchAPI(`?name_like=${keyword}`);
        }
        /**
         *
         * @param {Employee} Employee
         * @returns {Employee} Employee
         */
    create(Employee) {
        return this.fetchAPI("", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Employee),
        });
    }
    getById(id) {
        return this.fetchAPI(`${id}`);
    }
    update(Employee) {
        return this.fetchAPI(`${Employee.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Employee),
        });
    }
    deleteById(id) {
        return this.fetchAPI(`${id}`, {
            method: "DELETE",
        });
    }
    validate(Employee) {
        return true;
    }
}

export { EmployeesModel, Employee };