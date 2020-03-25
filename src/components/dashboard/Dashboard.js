import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getGroup } from '../../ducks/groupReducer'
import axios from 'axios'

import './dashboard.css'

function Dashboard(props) {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        props.getGroup(props.authReducer.user.user_id)
        props.groupReducer.groups.forEach(element => {
            axios.get(`/api/post/${element.group_id}`)
                .then(res => {
                    setPosts([...posts, ...res.data])
                })
        })
    }, [])



    if (!props.authReducer.user.username) return <Redirect to='/' />
    return (

        < div className='dash-body'>

            {
                posts.map((post, index) => {
                    return <div
                        key={index}
                        className='post'
                    >
                        <div className='date-name'>
                            <div className='username'>
                                {post.username}
                            </div>
                            <div
                                className='post-date'
                            >{post.date}</div>
                        </div>
                        <img className="post-photo" src={post.photo} />
                        <div className="post-content">

                            {post.content}
                        </div>


                    </div>
                })
            }
            <div className="bumper">

            </div>
        </div >
    );
}
const mapStateToProps = reduxState => {
    return {
        authReducer: reduxState.authReducer,
        groupReducer: reduxState.groupReducer
    }
}


export default connect(mapStateToProps, { getGroup })(Dashboard);