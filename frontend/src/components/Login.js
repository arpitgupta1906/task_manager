import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
        <div>
            <form>
            <div class="form-group">
                <label for="email">Email address:</label>
                <input type="email" class="form-control" placeholder="Enter email" id="email" />
            </div>
            <div class="form-group">
                <label for="pwd">Password:</label>
                <input type="password" class="form-control" placeholder="Enter password" id="pwd" />
            </div>
            
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>

        </div>
        );
    }
}

export default Login;