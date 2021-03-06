import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class Login extends Component {

    handleSubmit=(event)=>{
        event.preventDefault();
        const password=event.target.elements.password.value;
        const email=event.target.elements.email.value;
        // console.log(email)

        axios.post('http://localhost:8080/users/login/',{
            email: email,
            password: password
        }).then(res=>{
            // console.log(res.data.token)
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('user',JSON.stringify(res.data.user))
            this.props.history.push('/')
            // console.log(localStorage.getItem('token'))
        })
        .catch(error=>console.error(error));

        
    }

    render() {
        return (
        <div>
            <form onSubmit={this.handleSubmit}>
            <div class="form-group">
                <label for="email">Email address:</label>
                <input name='email' type="email" class="form-control" placeholder="Enter email" id="email" />
            </div>
            <div class="form-group">
                <label for="pwd">Password:</label>
                <input name='password' type="password" class="form-control" placeholder="Enter password" id="pwd" />
            </div>
            
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>

        </div>
        );
    }
}

export default withRouter(Login);