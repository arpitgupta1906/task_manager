import React, { Component } from 'react';
import './Layout.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
class Layout extends Component {

    
    constructor(props) {
        super(props);

        this.state={
            isAuthenticated: false
        }
        // if(localStorage.getItem('token')){
        //     this.setState({
        //         isAuthenticated:true
        //     })
        // }
        console.log(this.state.isAuthenticated)
    }
    
    componentDidMount(){
        console.log(localStorage.getItem('token'))
        if(localStorage.getItem('token')){
            this.setState({
                isAuthenticated:true
            })
        }
        console.log(this.state.isAuthenticated)
    }

    clickLogout=(event)=>{
        let token=localStorage.getItem('token')
        // token=JSON.parse(token);
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        console.log(localStorage.getItem('token'));
        
        
        axios.post('http://localhost:8080/users/logout',
        {
            token
        },
        config
        ).then((res)=>{
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.props.history.push('/');
        }).catch((error)=>{
            console.log(error);
        })
    }

    render() {
        // if(localStorage.getItem('token')){
        //     this.setState({
        //         isAuthenticated:true
        //     })
        // }
        return (
            <div>
               <nav class="navbar bg-light fixed-top">
                
                
                <a href="/" className="navbar-brand">WebSiteName</a>
                {
                    this.state.isAuthenticated?
                    <ul class="navbar-nav">
                   <li className="nav-item please"> <Link to='/'>Posts</Link></li>
                   <li className="nav-item please"><Link to="/user">My Profile</Link></li>
                   <li className="nav-item please"> <Link to="/user/edit">Edit Profile</Link></li>
                    </ul>
                    
                
                    :
                    ""
                }
                              
              {
                  this.state.isAuthenticated?
                  <ul class="navbar-nav navbar-right">
                <li className="nav-item" onClick={this.clickLogout}><Link><span class="glyphicon glyphicon-log-in"></span> Logout</Link></li>
                </ul>
                :
                <ul class="navbar-nav navbar-right">
                <li className="nav-item"><Link to='/signup'><span class="glyphicon glyphicon-user"></span> Sign Up</Link></li>
                <li className="nav-item"><Link to='/login'><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
              }     
                
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