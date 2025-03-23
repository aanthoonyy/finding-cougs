import '../css files/index.css';
import '../css files/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    return (
        <div className="container-fluid  p-0">
        <div className="container-fluid  p-0">
            <div className="row back">
                <div className="col-2"></div>
                <div className="col mainArea text-center">
                    Login
                    <form> 
                        <fieldset>
                            <legend>Login</legend>
                            <div className="input input-group mb-3">
                                <input type="text" className="form-control" id="name" name="name" placeholder="Your username"/>
                            </div>
                            <div className="input">
                                <input type="text" className="form-control" id="email" name="email" placeholder="Your email"/>
                            </div>
                            <div className="input">
                                <input type="password" className="form-control" id="pwd" name="pwd" placeholder="Your password"/>
                            </div>
                            <div id="error"></div>
                            <button type="button" className="btn btn-primary input">Login</button>
                            <div>
                                <a className="link-opacity-100" href="#">
                                    No Account? Create an Account
                                </a>
                            </div>
                        </fieldset>
                    </form>
                    
                </div>
                <div className="col-2"></div>
            </div>
        </div>

        <div id="footer"></div>
    </div>
    );
};
export default Login;