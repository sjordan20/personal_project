import React, { Component } from "react";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone'
import { GridLoader } from 'react-spinners';
import axios from "axios";

import "./addGroup.css";
class AddGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isUploading: false,
            url: ''
        }
    }
    getSignedRequest = ([file]) => {

        this.setState({ isUploading: true })
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`

        axios.get('/api/signs3', {
            params: {
                'file-name': fileName,
                'file-type': file.type
            }
        }).then((res) => {
            const { signedRequest, url } = res.data
            console.log(signedRequest, url)
            this.uploadFile(file, signedRequest, url)
        }).catch(err => {
            console.log(err)
        })
    }

    uploadFile = (file, signedRequest, url) => {
        const options = {
            headers: {
                'Content-type': file.type
            },
        }

        axios.put(signedRequest, file, options)
            .then(res => {
                this.setState({ isUploading: false, url })
            })
            .catch(err => {
                this.setState({
                    isUploading: false,
                })
            })
    }



    render() {
        if (!this.props.authReducer.user.username) return <Redirect to='/' />
        const { url, isUploading } = this.state;

        return (
            <div >
                <div className='body' >
                    <div className="border-line"></div>
                    <div className="create-group-container">
                        <div className='title-container'>
                            <div className='create-group-title'> Create Your Group</div>
                        </div>
                        <Dropzone
                            onDropAccepted={this.getSignedRequest}
                            style={{
                                position: 'relative',
                                width: 100,
                                height: 100,
                                borderWidth: 3,
                                borderColor: 'rgb(102, 102, 102)',
                                borderStyle: 'dashed',
                                borderRadius: 5,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}
                            accept="image/*"
                            multiple={false}
                        >
                            {isUploading ? <GridLoader /> : <p className='drop'>Upload Group Picture</p>}
                        </Dropzone>
                        <form >
                            <input
                                className="group-name-input"
                                placeholder='Enter Group Name'
                            />
                            <div className='create-group-button'>
                                <button
                                    className='group-button'
                                >Create Group</button>

                            </div>
                        </form>
                    </div>

                    <div className="groups-body">
                        <div className='join-title'>Join a Group</div>
                        <div className='group-container'>
                            <div className='group-photo' >
                                <img src={url} />
                            </div>
                            <div className='group-name-container'>
                                <div className='group-name' > Test</div>
                            </div>
                            <i className="fa fa-plus-square"></i>
                        </div>
                    </div>

                </div>
            </div >
        );
    }
}

const mapStateToProps = reduxState => {
    return {
        authReducer: reduxState.authReducer
    }
}


export default connect(mapStateToProps)(AddGroup);
