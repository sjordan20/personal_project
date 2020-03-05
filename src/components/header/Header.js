import React, { useState } from "react";
import { connect } from "react-redux";
import { logout, register, login } from "../../ducks/authReducer";

import Login from "../login/Login";
import Register from "../register/Register";

function Header(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [registered, setRegistered] = useState(true)

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const submitUser = (event) => {
        event.preventDefault()
        props.register(username, password);
        setUsername('')
        setPassword('')
    };

    const loginUser = event => {
        event.preventDefault()
        props.login(username, password)
        setUsername('')
        setPassword('')
    }


    const setFalse = () => {
        setRegistered(false)
    }
    const setTrue = () => {
        setRegistered(true)
    }

    const logout = () => {
        props.logout();
    };
    console.log(props.authReducer.user.username)
    return (
        <div>
            {!props.authReducer.user.username ? (
                registered ? (

                    <div>
                        <form
                            onSubmit={loginUser}>
                            <input
                                placeholder="Enter Username"
                                value={username}
                                name="username"
                                onChange={handleUsername}
                            />
                            <input
                                placeholder="Enter Your Password"
                                value={password}
                                name="password"
                                type="password"
                                onChange={handlePassword}
                            />
                            <button>Login</button>
                        </form>
                        <button onClick={setFalse}>Go to Register</button>
                    </div>

                ) : (
                        <div>
                            <form
                                onSubmit={submitUser}>
                                <input
                                    placeholder="Enter New Username"
                                    value={username}
                                    name="username"
                                    onChange={handleUsername}
                                />
                                <input
                                    placeholder="Create Your Password"
                                    value={password}
                                    name="password"
                                    type="password"
                                    onChange={handlePassword}
                                />
                                <button>Register</button>
                            </form>
                            <button onClick={setTrue}> Go to Login</button>
                        </div>
                    )
            ) : (<>
                <h2 className='username'>{props.authReducer.user.username}</h2>
                <button
                    onClick={logout}
                >Logout</button>
            </>
                )}

        </div>
    );
}

const mapStateToProps = (reduxState) => {
    return {
        authReducer: reduxState.authReducer
    };
};

export default connect(mapStateToProps, { logout, register, login })(Header);
