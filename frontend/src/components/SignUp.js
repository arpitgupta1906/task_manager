import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state={
            
                email: '',
                name: "",
                password: "",
                age: "",
                errors:{
                    name:"",
                    email:"",
                    password:"",
                    age:""
                }
            
        }
    }

    handleSubmit=(event)=>{
        const password=event.target.elements.password.value;
        const password2=event.target.elements.password2.value;
        const email=event.target.email.value;
        const name=event.target.name.value;
        let age=event.target.age.value;

        if(this.validateForm(this.state.errors) && password===password2 && password.length>6){
            if(age.size===0)
            age=0;
            axios.post('http://localhost:8080/users/',{
                email,
                password,
                name,
                age
            }).then((res)=>{
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('user',JSON.stringify(res.data.user))
                this.props.history.push('/');
                // console.log(res.data.token)
            })
        }
        else{
            let errors=this.state.errors;
            errors.password='The two passwords do not match';
            this.setState({
                errors
            });
            console.log('Invalid form')
        }
    }


    validateForm=(errors)=>{
        let valid=true;
        Object.values(errors).forEach(
            (val)=>val.length>0 && (valid=false)
        );
        return valid;
    }

    handleChange=(event)=>{
        event.preventDefault();
        let {name,value}=event.target;
        let errors=this.state.errors;

        switch(name){
            case 'name':
                errors.name=value.length<5?'Full Name must be 5 Characters':"";
                break;
            case 'age':
                errors.age=value <0?'Age cannot be negative':'';
                break;
            default:
                break;
        }
        this.setState({errors,[name]:value},()=>{
            console.log(errors);
        })
    }

    render() {
        let errors=this.state;
    return (
    <div>
        <form onSubmit={this.handleSubmit}>
        <div class="form-group">
            <label for="name">Username:</label>
            <input type="name" onChange={this.handleChange} class="form-control" placeholder="Enter Username" id="name" />
            {this.state.name.length>0 && <span className='error'>{errors.name}</span>}
        </div>

        <div class="form-group">
            <label for="email">Email address:</label>
            <input type="email" onChange={this.handleChange} class="form-control" placeholder="Enter email" id="email" />
            {this.state.email.length>0 && <span className='error'>{errors.email}</span>}
        </div>

        <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" onChange={this.handleChange} class="form-control" placeholder="Enter password" id="pwd" />
        </div>
        <div class="form-group">
            <label for="pwd2">Confirm Password:</label>
            <input type="password" onChange={this.handleChange} class="form-control" placeholder="Enter password again" id="pwd2" />
            {<span className='error'>{errors.password}</span>}
        </div>
        <div class="form-group">
            <label for="age">Age:</label>
            <input class="form-control" onChange={this.handleChange} placeholder="Enter Age" id="age" />
            {this.state.age.length>0 && <span className='error'>{errors.age}</span>}
        </div>
        <button type="submit" class="btn btn-primary">SignUp</button>
        </form>


    </div>
    );
    }
}

export default withRouter(SignUp);