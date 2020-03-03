import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import Register from './components/register/Register'
import Login from './components/login/Login'
import SearchDashboard from './components/searchDashboard/SearchDashboard'
import searchedPost from './components/searchedPost/SearchedPost'
import CreatePost from './components/createPost/CreatePost'
import groupProfile from './components/groupProfile/GroupProfile'

export default (
    <Switch>
        <Route exact path='/' component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/register" component={Register} />
        <Route path="/searchDashboard" component={SearchDashboard} />
        <Route path="/searchedPost" component={searchedPost} />
        <Route path="/createPost" component={CreatePost} />
        <Route path="/groupProfile" component={groupProfile} />
    </Switch>

)