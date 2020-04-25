import React, { Component } from 'react';
import './UserProfile.css';
import axios from 'axios';
class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state={
            user:{}
        }
    }
    
    componentDidMount(){
        let token=localStorage.getItem('token');
        
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        if(token){

            this.setState({
                isAuthenticated: true
            })
            axios.get('http://localhost:8080/users/me/',
            config
            ).then((res)=>{
                this.setState({
                    user:res.data
                })
                // console.log(res.data)
            }).catch((error)=>{
                console.log(error)
            })

        }
    }

    render() {
        return (
            <div>
                <div class="card">
                <img src="" alt="John" className="imageclass" />
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