import React, { Component } from "react";
import './editPost.css'

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: props.content
        };
    }

    handleCancel = () => {
        this.setState({ content: this.props.content });
        this.props.toggleEdit();
    };

    handleEditChange = (event) => {
        this.setState({ content: event.target.value });
    };
    render() {
        // console.log(this.props.content)
        return (
            <div className="body">
                <div className="post">
                    <textarea
                        rows="15"
                        cols="40"
                        value={this.state.content}
                        onChange={this.handleEditChange}
                    />

                    <div className="cancel-save-container">
                        <div className="cancel-button-container">
                            <button className='cancel-button'
                                onClick={() => this.handleCancel()}>Cancel Edit</button>
                        </div>

                        <div className='save-button-container'>
                            <button
                                className='save-button'
                                onClick={() => {
                                    this.props.editPost(this.props.id, this.state.content);
                                    this.props.toggleEdit();
                                }}
                            >
                                Save Edit
						</button>
                        </div>
                    </div>
                </div>
                <div className="bumper"></div>
            </div>
        );
    }
}

export default EditPost;
