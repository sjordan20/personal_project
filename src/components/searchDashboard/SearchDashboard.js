import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'

class SearchDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersGroups: [],
            selectGroup: 1,
            selectDate: 0,
            datePosts: []
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
            console.log("here",res.data)
                this.setState({ datePosts: res.data })
            })


    }





    render() {
        const selectDates = this.state.datePosts.map((post)=> {
            return <h1>{post.content}</h1>
        })
        const mappedUsersGroups = this.state.usersGroups.map((element, index) => {
            return <option
                key={index}
                value={element.user_id}>{element.name}</option>;
        });
        console.log(this.state.selectDate)
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