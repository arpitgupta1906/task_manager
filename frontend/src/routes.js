import React from 'react';
import {Route} from 'react-router-dom';
import Tasks from './containers/Tasks';
import Login from './components/Login';
import SignUp from './components/SignUp';
import EditProfile from './components/EditProfile';
import UserProfile from './components/UserProfile';
import EditTask from './components/EditTask';

const BaseRouter=()=>(
    <div>
        <Route exact path='/' component={Tasks} />
        <Route exact path='/update/:ID/' component={EditTask} />
        <Route exact path='/login/' component={Login} />
        <Route exact path='/signup/' component={SignUp} />
        <Route exact path='/user/' component={UserProfile} />
        <Route exact path='/user/edit/' component={EditProfile} />
        
    </div>
);

export default BaseRouter;