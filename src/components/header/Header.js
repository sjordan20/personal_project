import React, { useState } from "react";
import { connect } from "react-redux";
import { logout, register, login } from "../../ducks/authReducer";
import './header.css'

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

    return (
        <div>
            {!props.authReducer.user.username ? (
                registered ? (

                    <div className='header-base'>


                        <h1 className="title">My App Name
                            </h1>
                        <div className="input-box">
                            <form
                                onSubmit={loginUser}>
                                <input
                                    className='username-input'
                                    placeholder="Enter Username"
                                    value={username}
                                    name="username"
                                    onChange={handleUsername}
                                />
                                <input
                                    className='password-input'
                                    placeholder="Enter Your Password"
                                    value={password}
                                    name="password"
                                    type="password"
                                    onChange={handlePassword}
                                />

                                <button
                                    className='login-register-button'
                                >Login</button>
                            </form>
                        </div>
                        <button
                            className='go-to'
                            onClick={setFalse}>Go to Register</button>
                    </div>

                ) : (
                        <div className='header-base'>
                            <h1 className="title">My App Name

                            </h1>
                            <div className='input-box'>

                                <form
                                    onSubmit={submitUser}>
                                    <input
                                        className='username-input'
                                        placeholder="Enter New Username"
                                        value={username}
                                        name="username"
                                        onChange={handleUsername}
                                    />
                                    <input
                                        className='password-input'
                                        placeholder="Create Your Password"
                                        value={password}
                                        name="password"
                                        type="password"
                                        onChange={handlePassword}
                                    />
                                    <button
                                        className="login-register-button"
                                    >Register</button>
                                </form>
                            </div>
                            <button
                                className='go-to'
                                onClick={setTrue}> Go to Login</button>
                        </div>
                    )
            ) : (
                    <div className='logged-header'>
                        <h1 className="title">My App Name
                            </h1>
                        <button
                            className='logout'
                            onClick={logout}
                        >Logout</button>
                    </div>
                )
            }

        </div >
    );
}

const mapStateToProps = (reduxState) => {
    return {
        authReducer: reduxState.authReducer
    };
};

export default connect(mapStateToProps, { logout, register, login })(Header);
