import React, { Component } from 'react';
import './Layout.css';
import {Link} from 'react-router-dom';

class Layout extends Component {
    render() {
        return (
            <div>
               <nav class="navbar bg-light fixed-top">
                
                
                <a href="" className="navbar-brand">WebSiteName</a>
                
                {/* <ul className="navbar-nav">
                <li className="nav-item active"><a href="">Home</a></li>
                <li className="nav-item"><a href="">Page 1</a></li>
                <li className="nav-item"><a href="">Page 2</a></li>
                </ul> */}
                <Link to='/'>Posts</Link>
                <Link to="/user">My Profile</Link>
                <Link to="/user/edit">Edit Profile</Link>
                <ul class="navbar-nav navbar-right">
                <li className="nav-item"><Link to='/signup'><span class="glyphicon glyphicon-user"></span> Sign Up</Link></li>
                <li className="nav-item"><Link to='/login'><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
                
                </nav>
                <div class='mycontent'>
                <header className="App-header">
                    {this.props.children}
                 </header>
                </div>
            </div>
        );
    }
}

export default Layout;