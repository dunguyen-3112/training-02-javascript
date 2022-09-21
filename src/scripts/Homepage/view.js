import { $ } from "../constant";

class HomepageView {
    constructor(selector) {
        this.selector = selector;
    }
    render = async () => {
        $(`.${this.selector}`).innerHTML = `
            <acticle class="main">
                <section>
                    <nav class="navigation">
                        <a href="/">Home</a>
                        <a href="/employees">Employees</a>
                        <a href="/about">About</a>
                        <a href="/logout">Logout</a>
                    </nav>
                </section>
                <section class="content">
                    
                </section>
            </acticle>
            `;
    };
}
export { HomepageView };
