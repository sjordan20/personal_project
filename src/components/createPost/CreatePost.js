import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { v4 as randomString } from "uuid";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";

import "./create-post.css";

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUploading: false,
            url: "",
            usersGroups: [],
            content: "",
            selectGroup: 1
        };
    }
    getSignedRequest = ([file]) => {
        this.setState({ isUploading: true });
        const fileName = `${randomString()}-${file.name.replace(/\s/g, "-")}`;

        axios
            .get("/api/signs3", {
                params: {
                    "file-name": fileName,
                    "file-type": file.type
                }
            })
            .then((res) => {
                const { signedRequest, url } = res.data;
                console.log(signedRequest, url);
                this.uploadFile(file, signedRequest, url);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    uploadFile = (file, signedRequest, url) => {
        const options = {
            headers: {
                "Content-type": file.type
            }
        };

        axios
            .put(signedRequest, file, options)
            .then((res) => {
                this.setState({ isUploading: false, url });
            })
            .catch((err) => {
                this.setState({
                    isUploading: false
                });
            });
    };

    componentDidMount() {
        this.getUsersGroups();
    }

    getUsersGroups = () => {
        axios
            .get(`/api/group/${this.props.authReducer.user.user_id}`)
            .then((res) => {
                this.setState({ usersGroups: res.data });
            });
    };

    handleContentChange = (event) => {
        this.setState({
            content: event.target.value
        })
    }

    handleSelectGroup = (event) => {
        this.setState({
            selectGroup: event.target.value
        })
    }

    createPost = () => {
        axios.post(`/api/post/${this.props.authReducer.user.user_id}`, {
            group_id: this.state.selectGroup,
            content: this.state.content,
            photo: this.state.url
        })
            .then(() => {
                this.props.history.push('/dashboard')
            })
            .catch(err => console.log(err))
    };

    render() {
        console.log(this.state.selectGroup)
        const mappedUsersGroups = this.state.usersGroups.map((element, index) => {
            return <option key={index} value={element.group_id}>{element.name}</option>;
        });

        if (!this.props.authReducer.user.username) return <Redirect to="/" />;
        return (
            <div className="post-create-body">
                <div className='top-bumper'></div>

                <div className="create-container">
                    <textarea
                        value={this.state.name}
                        onChange={this.handleContentChange}
                        className="post-text"
                        rows="20"
                        cols="40"
                        placeholder="Dear Diary...."
                    />
                    <div className="dropzone">
                        <Dropzone
                            onDropAccepted={this.getSignedRequest}
                            style={{
                                position: "relative",
                                width: 50,
                                height: 50,
                                borderWidth: 3,
                                borderColor: "rgb(102, 102, 102)",
                                borderStyle: "dashed",
                                borderRadius: 5,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            accept="image/*"
                            multiple={false}
                        >
                            {this.isUploading ? <GridLoader /> : <p className="drop-text">Upload Picture</p>}
                        </Dropzone>

                        <div className="drop-container">
                            <label className="label-group" htmlFor="test">Select Group to Post In</label>
                            <select id="test"
                                value={this.state.value}
                                onChange={this.handleSelectGroup}
                            >{mappedUsersGroups}</select>

                        </div>
                    </div>
                    <div className="button-container-cp">
                        <button
                            onClick={this.createPost}
                            className="submit">Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return {
        authReducer: reduxState.authReducer,
        groupReducer: reduxState.groupReducer
    };
};

export default connect(mapStateToProps)(CreatePost);
