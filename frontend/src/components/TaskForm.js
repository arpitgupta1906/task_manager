import React, { Component } from 'react';
import axios from 'axios';

class TaskForm extends Component {
    

    handleFormSubmit=(event,requestType)=>{
        // event.preventDefault();
       
        const description=event.target.elements.description.value;
        let completed=event.target.elements.completed.value;
        
        completed=completed==='False'?false:true;
        console.log(completed)
        let token=localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        switch(requestType){
            case 'post':
                axios.post('http://localhost:8080/tasks/',{
                    description,
                    completed
                },
                config)
                break;
            case 'patch':

                return console.log("PUT",description)
        }
    }

    render() {
        return (
        <div>
            <form onSubmit={(event)=>this.handleFormSubmit(
                event,
                this.props.requestType,
            )}>
            <div class="form-group">
            <label for="Description">Description:  </label>
            <input name='description' class="form-control" placeholder="" id="description" />
            <label for="completed">Completed:  </label>
            <select name="completed" defaultValue="False">
                <option name="true"> True</option>
                <option name="false">False</option>
            </select>
            </div>
            <button type="submit" class="btn btn-primary">Add</button>
            </form>
        </div>
        );
    }
}

export default TaskForm;