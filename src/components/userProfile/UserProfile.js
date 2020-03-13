import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import PostDisplay from '../postDisplay/PostDisplay'

class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userPosts: []
        }
    }

    componentDidMount() {
        this.getUserPosts()
    }

    getUserPosts = () => {

        axios.get(`/api/postUser/${this.props.authReducer.user.user_id}`)
            .then(res => {
                this.setState({ userPosts: res.data })
            })
            .catch(err => console.log(err))

    }
    deletePost = (post_id) => {

        axios.delete(`/api/post/${post_id}`)
            .then(res => {
                this.getUserPosts()
            })
            .catch(err => console.log(err))
    }

    editPost = (post_id, content) => {
        axios.put(`/api/post/${post_id}`, { content })
            .then(() => {
                this.getUserPosts()
            })
            .catch(err => console.log(err))
    }

    render() {
        if (!this.props.authReducer.user.username) return <Redirect to="/" />;
        const mappedUsersPosts = this.state.userPosts.map((element, index) => {
            // console.log(element.content)
            return (

                <PostDisplay
                    content={element.content}
                    toggleEdit={this.toggleEdit}
                    deletePost={this.deletePost}
                    editPost={this.editPost}
                    id={element.post_id}
                    key={index}
                />
            )

        })

        return (
            <div>
                {mappedUsersPosts}
            </div>
        );
    }
}

const mapStateToProps = reduxState => {
    return {
        authReducer: reduxState.authReducer
    }
}


export default connect(mapStateToProps)(UserProfile);