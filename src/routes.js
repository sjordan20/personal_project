import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import SearchDashboard from './components/searchDashboard/SearchDashboard'
import SearchedPost from './components/searchedPost/SearchedPost'
import CreatePost from './components/createPost/CreatePost'
import GroupProfile from './components/groupProfile/GroupProfile'
import Landing from './components/landing/Landing'
import AddGroup from './components/addGroup/AddGroup'


export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path='/addGroup' component={AddGroup} />
        <Route path="/searchDashboard" component={SearchDashboard} />
        <Route path="/searchedPost" component={SearchedPost} />
        <Route path="/createPost" component={CreatePost} />
        <Route path="/groupProfile" component={GroupProfile} />
    </Switch>

)