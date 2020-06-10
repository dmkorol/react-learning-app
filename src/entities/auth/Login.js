import React, {useState} from 'react';
import './Login.scss';
import {useAuthUser} from "../../shared/utils/AuthUser";
import {apiLogin} from "../../api/api";

const Login = ({ history }) => {
    const { setLogged } = useAuthUser();
    const [errorMessage, setErrorMessage] = useState(null);

    function handleSubmit(e) {
        e.preventDefault()
        const [usernameNode, passwordNode] = e.target.elements

        apiLogin(usernameNode.value, passwordNode.value)
            .then(() => {
                setLogged(true);
                history.push('/dashboard')
            })
            .catch(() => {
                setLogged(false);
                setErrorMessage('Invalid Login or Password');
            })
    }
    return (<>
        <div className="sidenav bg-gradient-primary">
            <div className="login-main-text">
                <h2>Login Page</h2>
                <p>Login or register from here to access.</p>
                <p>Login: <b>admin</b> Password: <b>admin</b></p>
            </div>
        </div>
        <div className="main">
            <div className="col-md-6 col-sm-12">
                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>User Name</label>
                            <input type="text" className="form-control" placeholder="User Name"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password"/>
                        </div>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <button type="submit" className="btn btn-primary mr-2">Login</button>
                        <button type="button" className="btn btn-secondary">Register</button>
                    </form>
                </div>
            </div>
        </div>
    </>);
}

export default Login;
