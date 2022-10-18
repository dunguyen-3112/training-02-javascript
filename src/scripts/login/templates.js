const templateFormLogin = `

    <div class="modal-container" style="display: block;">
        <form method="post" class="form-login" name="formLogin">
            <title class="modal-title">Login</title>
            <div class="modal-content">
                <label for="" class="form-group">
                    <input type="text" class="form-control" name="username" placeholder="Username">
                    <span class="form-message"></span>
                </label>
                <label for="" class="form-group">
                    <input type="password" class="form-control" name="password" placeholder="Password">
                    <span class="form-message"></span>
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
export { templateFormLogin };
