const TemPlateFormLogin = `

    <div class="modal-container" style="display: block;">
        <form action="/login" method="post" class="form-login" name="formLogin">
            <title class="modal-title">Login</title>
            <div class="modal-content">
                <label for="" class="form-group">
                    <input type="text" class="form-control" name="username" placeholder="Username">
                </label>
                <label for="" class="form-group">
                    <input type="password" class="form-control" name="password" placeholder="Password">
                    <label  class="hide-password">
                        <input type="checkbox" class="hide-password">
                        <div class="btn btn-icon btn-password">
                        </div>
                    </label>
                </label>
            </div>
            <div class="modal-action">
                <button class="btn btn-dark" type="submit" name="btnLogin">Login</button>
            </div>
        </form>
    </div>
`;
export { TemPlateFormLogin };
