import React from "react";
import "./addGroup.css";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

function AddGroup(props) {

    if (!props.authReducer.user.username) return <Redirect to='/' />
    return (
        <div className='body'>
            <div className="border-line"></div>
            <div className="create-group-container">
                <form>
                    <input
                        className="group-name-input"
                        placeholder='Enter Group Name'
                    />
                    <input
                        placeholder='Upload Group Photo'
                    />
                    <i className="fa fa-plus-square"></i>
                </form>
            </div>

            <div className="groups-body">
                <div className='group-container'>
                    <div className='group photo' ></div>
                    <div className='group-name' ></div>
                    <i className="fa fa-plus-square"></i>
                </div>
            </div>

        </div>
    );
}

const mapStateToProps = reduxState => {
    return {
        authReducer: reduxState.authReducer
    }
}


export default connect(mapStateToProps)(AddGroup);
