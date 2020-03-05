import React, { useState } from 'react';
import { connect } from 'react-redux'
import { login } from '../../ducks/authReducer'
import { Link } from 'react-router-dom'

function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsername = event => {
        setUsername(event.target.value)
    }

    const handlePassword = event => {
        setPassword(event.target.value)
    }

    const loginUser = event => {
        event.preventDefault()
        props.login(username, password)
        setUsername('')
        setPassword('')
    }
    return (
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

            <Link to='/register'><button>Register</button></Link>
        </div>
    );
}

const mapStateToProps = (reduxState) => {
    return {
        authReducer: reduxState.authReducer
    };
};

export default connect(mapStateToProps, { login })(Login);