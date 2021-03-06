import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class EditProfile extends Component {

    constructor(props) {
        super(props);
        const user=JSON.parse(localStorage.getItem('user'));
        this.state={
            
                email: user.email,
                name: user.name,
                password: "",
                age: user.age,
                errors:{
                    name:"",
                    email:"",
                    password:"",
                    age:""
                }
            
        }
    }

   
    
    handleSubmit=(event)=>{
        event.preventDefault();
        const password=event.target.elements.password.value;
        const password2=event.target.elements.password2.value;
        const name=event.target.elements.name.value;
        const age=event.target.elements.age.value;


        if(this.validateForm(this.state.errors) && (password===password2 || password.length===0)){
            let data={}
            if(password.length>0){
                data['password']=password
            }
            data['age']=age
            data['name']=name
            
            let token=localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            axios.patch('http://localhost:8080/users/update/',
            data,
            config
            ).then((res)=>{
                this.props.history.push('/')
                // console.log(res.data)
                this.forceUpdate();
            }).catch((error)=>{
                console.log(error)
            })
            console.log(data);
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
        const {name,value}=event.target;
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
        
        const {errors}=this.state;
        return (
            <div>
           
        <form onSubmit={this.handleSubmit}>
        <div class="form-group">
            <label for="email">Email address:</label>
            <input type="email"   class="form-control" value={this.state.email} id="email" readOnly />
        </div>

        <div class="form-group">
            <label for="name">Username:</label>
            <input name='name' type="name" onChange={this.handleChange} defaultValue={this.state.name} class="form-control" placeholder="Enter Username" id="name" />
            {this.state.name.length>0 && <span className='error'>{errors.name}</span>}
        </div>

        <div class="form-group">
            <label for="pwd">Password:</label>
            <input name='password' type="password" class="form-control" placeholder="Enter password" id="pwd" />
        </div>
        <div class="form-group">
            <label for="pwd2">Confirm Password:</label>
            <input name='password2' type="password" class="form-control" placeholder="Enter password again" id="pwd2" />
            {<span className='error'>{errors.password}</span>}

        </div>
        <div class="form-group">
            <label for="age">Age:</label>
            <input name='age' defaultValue={this.state.age} class="form-control" onChange={this.handleChange} placeholder="Enter Age" id="age" />
            {errors.age>0 && <span className='error'>{errors.age}</span>}
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
        </form>
            </div>
        );
    }
}

export default withRouter(EditProfile);