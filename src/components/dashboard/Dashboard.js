import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

function Dashboard(props) {

    if (!props.authReducer.user.username) return <Redirect to='/' />
    return (
        <div>
            Dashboard
        </div>
    );
}
const mapStateToProps = reduxState => {
    return {
        authReducer: reduxState.authReducer
    }
}


export default connect(mapStateToProps)(Dashboard);