import React, { Component } from 'react';
import SingleTask from '../components/SingleTask';
import TaskForm from '../components/TaskForm';
import axios from 'axios';

class Tasks extends Component {

    constructor(props) {
        super(props);
        this.state={
            tasks:[{
                owner:"Arpit",
                description: "Hello World ",
                completed: false
            },{
                owner:"Arpit",
                description: "Hello World ",
                completed: false
            }],
            isAuthenticated: false
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
            axios.get('http://localhost:8080/tasks',
            config
            ).then((res)=>{
                this.setState({
                    tasks:res.data
                })
                // console.log(res.data)
            }).catch((error)=>{
                console.log(error)
            })

        }
    }

    render() {
        
            const {tasks}=this.state
            console.log(tasks)
            const tasklist=tasks.map((task)=>{
              return  (
                <div className="mybody">
              <SingleTask task={task}/>
    
                </div>
              )
            });

       
        return (
            <div>
                {tasklist.length>0? tasklist: (<p>You don't have any tasks </p>)}
                <br/>

            <TaskForm requestType="post" />
                
            </div>

        );
    }
}

export default Tasks;