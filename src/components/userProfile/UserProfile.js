import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'

class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            editContent: '',
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
    deletePost = (post_id, group_id) => {
        this.props.userPosts.forEach(element => {
            axios.delete(`/api/post/${element.post_id}/${this.props.authReducer.user.user_id}`)
                .then(res => {
                    this.getUserPosts()
                })

        });
    }
    handleDelete = () => {
        this.deletePost()
    }

    render() {

        console.log(this.userPosts)
        const mappedUsersPosts = this.state.userPosts.map((element, index) => {
            return (
                <div>
                    {element.content}
                    <button
                        onClick={this.handleDelete}
                    >Delete</button>
                </div>
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