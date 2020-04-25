import React, { Component } from 'react';
import axios from 'axios';
class Login extends Component {

    handleSubmit=(event)=>{
        // event.preventDefault();
        const password=event.target.elements.password.value;
        const email=event.target.elements.email.value;

        axios.post('http://localhost:8080/users/login/',{
            email: email,
            password: password
        }).then(res=>{
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('user',JSON.stringify(res.data.user))
            // this.props.push.histo
            console.log(res.data.token)
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

export default Login;