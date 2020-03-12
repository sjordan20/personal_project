import React, { Component } from 'react';

class EditPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: props.content
        }

    }

    handleCancel = () => {
        this.setState({ content: this.props.content })
        this.props.toggleEdit()
    }

    handleEditChange = (event) => {
        this.setState({ content: event.target.value })
    }
    render() {
        // console.log(this.props.content)
        return (
            <div>
                <textarea
                    rows='15'
                    cols='40'
                    value={this.state.content}
                    onChange={this.handleEditChange}
                />
                <button
                    onClick={() => this.handleCancel()}
                >
                    Cancel Edit
                </button>
                <button
                    onClick={() => {
                        this.props.editPost(this.props.id, this.props.content)
                        this.props.toggleEdit()
                    }}

                >
                    Save Edit
                </button>
            </div >
        );
    }
}

export default EditPost;