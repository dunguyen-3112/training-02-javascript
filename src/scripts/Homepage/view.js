import { $ } from "../constant";

class HomepageView {
    constructor() {}
    Nav = () => `
        <nav class="navigation">
            <a href="#">Home</a>
            <a href="#">Employees</a>
            <a href="#">About</a>
            <a href="#">Logout</a>
        </nav>
        `;
}
export { HomepageView };
