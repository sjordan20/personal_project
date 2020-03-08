import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import './landing.css'

function Landing(props) {
    if (props.authReducer.user.username) return <Redirect to="/dashboard" />
    return (
        <div>
            <div >

                <div className='main-body'>
                    <div className='text-box'>
                        <h2 className="text">
                            FamGram where fams can gram and grams can fam
                        </h2>
                    </div>
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

export default connect(mapStateToProps)(Landing);