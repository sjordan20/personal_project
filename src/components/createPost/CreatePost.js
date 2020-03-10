import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone'
import { GridLoader } from 'react-spinners';




import './create-post.css'

class CreatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isUploading: false,
            url: '',
            usersGroups: []
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

    componentDidMount() {
        this.getUsersGroups()

    }

    getUsersGroups = () => {

        axios.get(`/api/group/${this.props.authReducer.user.user_id}`)
            .then(res => {
                this.setState({ usersGroups: res.data })
            })
    }





    render() {

        const mappedUsersGroups = this.state.usersGroups.map((element, index) => {
            return (

                <option value={element.user_id}>{element.name}</option>


            )

        })

        console.log(this.state.usersGroups)
        if (!this.props.authReducer.user.username) return <Redirect to='/' />
        return (
            <div className="post-create-body">

                <div className="create-container">
                    <textarea
                        className='text'
                        rows='15'
                        cols='40'
                        placeholder='Dear Diary....'
                    />
                    <div className='dropzone'>
                        <Dropzone
                            onDropAccepted={this.getSignedRequest}
                            style={{
                                position: 'relative',
                                width: 50,
                                height: 50,
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
                            {this.isUploading ? <GridLoader /> : <p className='drop-text'>Upload Picture</p>}
                        </Dropzone>
                        <label for='test'>test</label>
                        <select

                            id='test'>
                            {mappedUsersGroups}
                        </select>
                    </div>
                    <div className='button-container-cp'>
                        <button className='submit'>
                            Submit
                    </button>
                    </div>
                </div>


            </div>
        );
    }
}

const mapStateToProps = reduxState => {
    return {
        authReducer: reduxState.authReducer,
        groupReducer: reduxState.groupReducer
    }
}

export default connect(mapStateToProps)(CreatePost);