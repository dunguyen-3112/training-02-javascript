const TemPlateHeaderTableEmployees = `
            <div class="flex">
                <form class="form-search" name="formSearch" action="#" method="post">
                    <input type="text" class="control-search" name="keyword" placeholder="Search...">
                    <button class="icon-search"></button>
                </form>
                <button class="btn btn-icon btn-add"> </button>
            </div>
            <table class="list-employee">
                <thead>
                    <tr>
                        <th>Of</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody class="table-body">

                </tbody>
            </table>
            `;
const TemplateModalFormAddEmployees = `
        <div class="modal-container">
        <button class="btn-close"></button>
        <form action="#" method="post" name="formNewEmployee" class="form-add">
            <title class="modal-title">Add new Employee</title>
            <div class="modal-content">
                <label class="form-2">
                    <span class="form-label">Name</span>
                    <input type="text" placeholder="Please type your name" name="name" class="form-control" required>
                    <span class="message">Valid address, minimum 6 characters!</span>
                </label>
                <label>
                    <span class="form-label">Gender</span>
                    <div class="form-group">
                        <div class="form-radio-option">
                            <span >Male</span>
                            <input type="radio"  name="gender" class="form-control" value="true" checked>
                        </div>
                        <div class="form-radio-option">
                            <span >FeMale</span>
                            <input type="radio"  name="gender" class="form-control" value="false">
                        </div>
                    </div>
                </label>
                <label>
                    <span class="form-label">Status</span>
                    <select name="status" class="form-control">
                        <option value="active">Active</option>
                        <option value="inactive">In Active</option>
                    </select>
                </label>
                <label class="form-2">
                    <span class="form-label">Address</span>
                    <input type="text" placeholder="Please type your address " name="address" class="form-control" required>
                    <span class="message">Valid address, minimum 6 characters!</span>
                </label>
                <label class="form-2">
                    <span class="form-label">Email</span>
                    <input type your="email"  placeholder="Please type your email  " name="email" class="form-control" required>
                    <span class="message">Valid email must include @!</span>
                </label>
                <label class="form-2">
                    <span class="form-label">Phone</span>
                    <input type="tel" placeholder="Please type your phone. Example: 123-123-1234" name="phone" class="form-control" required>
                    <span class="message">Valid phone number, minimum 10 characters amd sample Format.</span>
                </label>
            </div>
            <div class="modal-action">
                <button type="reset" class="btn btn-dark" name="btnReset">Reset</button>
                <button type="submit" class="btn btn-dark" name="btnSave">Save</button>
            </div>
        </form>
        </div>
    `;

export { TemPlateHeaderTableEmployees, TemplateModalFormAddEmployees };
