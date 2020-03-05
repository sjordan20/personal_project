import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

function Landing(props) {
    if (props.authReducer.user.username) return <Redirect to="/dashboard" />
    return (
        <div>
            Landing
        </div>
    );
}

const mapStateToProps = reduxState => {
    return {
        authReducer: reduxState.authReducer
    }
}

export default connect(mapStateToProps)(Landing);