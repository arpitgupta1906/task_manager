import React, { Component } from 'react';
import './UserProfile.css';
class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state={
            user:{
                name: 'Arpit',
                email: 'gupta.25@iitj.ac.in'
            }
        }
    }
    
    render() {
        return (
            <div>
                <div class="card">
                <img src=".fall.jpg" alt="John" className="imageclass" />
                <h1>{this.state.user.name}</h1>
                <p class="title">Active Member</p>
                <p>{this.state.user.email}</p>
               

                <a href="#"><i class="fa fa-dribbble"></i></a>
                <a href="#"><i class="fa fa-twitter"></i></a>
                <a href="#"><i class="fa fa-linkedin"></i></a>
                <a href="#"><i class="fa fa-facebook"></i></a>
               
                <p><button>Contact</button></p>
                </div>
            </div>
        );
    }
}

export default UserProfile;