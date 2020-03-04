import React, { useState } from "react";
import { connect } from "react-redux";
import { register } from "../../ducks/authReducer";
import { Link } from 'react-router-dom'


function Register(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const submitUser = (event) => {
        event.preventDefault()
        props.register(username, password);
    };

    console.log(props);
    return (
        <div>
            <form
                onSubmit={submitUser}>
                <input
                    placeholder="Enter New Username"
                    name="username"
                    onChange={handleUsername}
                />
                <input
                    placeholder="Create Your Password"
                    name="password"
                    type="password"
                    onChange={handlePassword}
                />
                <button>Register</button>
            </form>
            <Link to='/login'><button> Login</button></Link>
        </div>
    );
}

const mapStateToProps = (reduxState) => {
    return {
        authReducer: reduxState.authReducer
    };
};
export default connect(mapStateToProps, { register })(Register);
