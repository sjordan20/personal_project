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
            url: '',
            name: '',
            groups: []
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
        this.getGroups()
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    getGroups = () => {
        axios.get('/api/group')
            .then(res => {
                this.setState({ groups: res.data })
                // console.log(res.data)
            })
            .catch(err => console.log(err))
    }


    createGroup = () => {
        axios.post(`/api/group/${this.props.authReducer.user.user_id}`,
            {
                name: this.state.name,
                group_pic: this.state.url
            })
            .then(() => {
                this.getGroups()
            })
            .catch(err => console.log(err))
    }


    addMember = (group_id) => {
        console.log(group_id
            , this.props.authReducer.user.user_id)
        axios.post(`/api/users_groups/${group_id}`,
            { user_id: this.props.authReducer.user.user_id }
        )
            .then(() => {
                this.props.history.push('/dashboard')
            }
            ).catch(err => console.log(err))
    }

    handleAddMember = (id) => {
        console.log(id)
        this.props.addMember(id)

    }

    render() {
        if (!this.props.authReducer.user.username) return <Redirect to='/' />
        const { url, isUploading } = this.state;

        const mappedGroups = this.state.groups.map((element, index) => {

            return (
                <div>

                    <img src={element.group_pic} />
                    {element.name}
                    {/* {this.key = index} */}
                    <i
                        onClick={() => this.handleAddMember(element.group_id)}
                        className="fa fa-plus-square"></i>
                </div>
            )
        })

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
                                value={this.state.name}
                                onChange={this.handleNameChange}
                            />
                            <div className='create-group-button'>
                                <button
                                    onClick={this.createGroup}
                                    className='group-button'
                                >Create Group</button>

                            </div>
                        </form>
                    </div>

                    <div className="groups-body">
                        <div className='join-title'>Join a Group</div>
                        <div className='group-container'>
                            {mappedGroups}
                            {/* <div className='group-photo' >
                                <img src={mappedGroups.url} />
                            </div>
                            <div className='group-name-container'>
                                <div className='group-name' >{mappedGroups.name}</div>
                            </div> */}

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


export default connect(mapStateToProps, { AddGroup })(AddGroup);
