import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getGroup } from '../../ducks/groupReducer'
import axios from 'axios'


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
    // console.log(props.groupReducer.groups[0].group_id)
    return (
        < div >
            {
                posts.map(post => {

                    return <div>
                        <img src={post.photo} />
                        {post.username}
                        {post.content}

                        <div>{post.date}</div>
                    </div>
                })
            }
            < div className='body' >

            </div >
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