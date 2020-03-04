import React, { useState } from "react";
import { connect } from "react-redux";
import { logout } from "../../ducks/authReducer";

import Login from "../login/Login";
import Register from "../register/Register";

function Header(props) {
    const logout = () => {
        props.logout();
    };
    console.log(props.authReducer.user.username)
    return (
        <div>
            {!props.authReducer.user.username ? (
                <Login />
            ) : (
                    <button onClick={logout}>Logout</button>
                )}
        </div>
    );
}

const mapStateToProps = (reduxState) => {
    return {
        authReducer: reduxState.authReducer
    };
};

export default connect(mapStateToProps, { logout })(Header);
