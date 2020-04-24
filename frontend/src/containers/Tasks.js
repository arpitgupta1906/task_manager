import React, { Component } from 'react';
import SingleTask from '../components/SingleTask';
import TaskForm from '../components/TaskForm';

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
            }]
        }
    }

    render() {
        const tasklist=this.state.tasks.map((task)=>{
          return  (
            <div className="mybody">
          <SingleTask task={task}/>

            </div>
          )
        });
       
        return (
            <div>
                {tasklist}
                <br/>
                
        <formfortask />
                <TaskForm requestType="post" />
                
            </div>

        );
    }
}

export default Tasks;