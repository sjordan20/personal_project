import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './nav.css'

function Nav(props) {
    return (
        <div className='nav-body'>
            {props.authReducer.user.username ? (
                <div className='nav-container'>
                    <div className='button-container'>
                        <Link to='/dashboard'>
                            <i className="fa fa-home"></i>

                        </Link>
                    </div>
                    <div className='button-container'>
                        <Link to='/createPost'>
                            <i className="fa fa-plus"></i>
                        </Link>
                    </div>
                    <div className='button-container'>
                        <Link to='/addGroup'>
                            <i className="fa fa-users"></i>

                        </Link>
                    </div>
                    <div className="button-container">
                        <Link to='/searchDashboard'>

                            <i className="fa fa-search"></i>
                        </Link>
                    </div>
                    <div className='button-container'>
                        <Link to='/userProfile'>
                            <i className="fa fa-user"></i>
                        </Link>
                    </div>
                </div>
            ) : (
                    <div></div>

                )}



        </div>
    );
}

const mapStateToProps = (reduxState) => {
    return {
        authReducer: reduxState.authReducer
    };
};


export default connect(mapStateToProps)(Nav);