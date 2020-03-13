import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class SearchDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersGroups: [],
            selectGroup: 1,
            selectDate: 0,
            selectContent: '',
            datePosts: [],
            contentPosts: []
        }
    }

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

    handleSelectGroup = (event) => {
        this.setState({
            selectGroup: event.target.value
        })
    }

    handleSelectDate = (event) => {
        this.setState({
            selectDate: event.target.value
        })
    }
    searchDate = () => {
        axios.get(`/api/postDate/${this.state.selectGroup}?date=${this.state.selectDate}`)
            .then((res) => {
                this.setState({ datePosts: res.data })
            })
    }

    searchContent = () => {

        axios.get(`/api/postContent/${this.state.selectGroup}`)
            .then((res) => {
                this.setState({ contentPosts: res.data })
            })
    }

    handleSelectContent = (event) => {
        this.setState({
            selectContent: event.target.value, contentPosts: []
        })

    }

    resetSearch = () => {
        this.setState({
            contentPosts: [],
            datePosts: []

        })
    }


    render() {
        console.log(this.state.selectDate, this.state.selectContent)
        if (!this.props.authReducer.user.username) return <Redirect to="/" />;

        const selectContents = this.state.contentPosts.filter((post, index) => {
            return post.content.includes(this.state.selectContent)
        }).map((post, index) => {
            return <h2
                key={index}
            >
                {post.content}
            </h2>
        })

        const selectDates = this.state.datePosts.map((post, index) => {
            return <h1
                key={index}
            >{post.content}</h1>
        })
        const mappedUsersGroups = this.state.usersGroups.map((element, index) => {
            return <option
                key={index}
                value={element.user_id}>{element.name}</option>;
        });

        return (
            <div>

                <select
                    value={this.state.value}
                    onChange={this.handleSelectGroup}
                >{mappedUsersGroups}</select>
                <input
                    type='date'
                    onChange={this.handleSelectDate}

                />
                <button
                    onClick={this.searchDate}
                >Search Date</button>

                <div>
                    {selectDates}
                </div>
                <div>
                    <input
                        onChange={this.handleSelectContent}
                    />
                    <button
                        onClick={this.searchContent}
                    >Search Post Content</button>
                    <div>
                        {selectContents}
                    </div>
                </div>
                <button
                    onClick={this.resetSearch}
                >Clear Search</button>

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

export default connect(mapStateToProps)(SearchDashboard);