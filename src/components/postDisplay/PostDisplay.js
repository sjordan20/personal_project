import React, { Component } from 'react';
import EditPost from '../editPost/EditPost'
import UserPost from '../userPost/UserPost'

class PostDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        }

    }

    toggleEdit = () => {
        this.setState({ isEditing: !this.state.isEditing })
    }
    render() {
        return (
            <div>
                <>
                    {this.state.isEditing ? (
                        <EditPost
                            content={this.props.content}
                            editPost={this.props.editPost}
                            toggleEdit={this.toggleEdit}
                            id={this.props.id}
                        />
                    ) : (
                            <UserPost
                                content={this.props.content}
                                toggleEdit={this.toggleEdit}
                                id={this.props.id}
                                deletePost={this.props.deletePost}
                            />
                        )}
                </>

            </div>

        );
    }
}


export default PostDisplay;