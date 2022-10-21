const TemplateModalFormAddEmployees = (title) => `
        <div class="modal-container">
        <button class="btn-close"></button>
        <form action="#" method="post" name="form-employee" class="form-Employee">
            <title class="modal-title">${title}</title>
            <div class="modal-content">
                <label class="form-group">
                    <span class="form-label">Name</span>
                    <input type="text" placeholder="Please type your name" name="name"  class="form-control">
                    <span class="form-message">Valid address, minimum 6 characters!</span>
                </label>
                <label class="form-group">
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
                <label class="form-group">
                    <span class="form-label">Status</span>
                    <select name="status" class="form-control">
                        <option value="active">Active</option>
                        <option value="inactive">In Active</option>
                    </select>
                </label>
                <label class="form-group">
                    <span class="form-label">Address</span>
                    <input type="text" placeholder="Please type your address " name="address" class="form-control">
                    <span class="form-message">Valid address, minimum 6 characters!</span>
                </label>
                <label class="form-group">
                    <span class="form-label">Email</span>
                    <input type your="email"  placeholder="Please type your email  " name="email" class="form-control">
                    <span class="form-message">Valid email must include @!</span>
                </label>
                <label class="form-group">
                    <span class="form-label">Phone</span>
                    <input type="tel" placeholder="Please type your phone include 9 number!" name="phone" class="form-control">
                    <span class="form-message">Valid phone number, minimum 10 characters amd sample Format.</span>
                </label>
            </div>
            <div class="modal-action">
                <button type="reset" class="btn btn-dark" name="btnReset">Reset</button>
                <button type="submit" class="btn btn-dark" name="btnSave">Save</button>
            </div>
        </form>
        </div>
    `;
export { TemplateModalFormAddEmployees };
