import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            description:"",
            completed: null,
            errors:{
                completed:""
            }
        }
    }

    handleFormSubmit=(event,requestType)=>{
        event.preventDefault();
        const description=event.target.elements.description.value;
        const completed=event.target.elements.completed.value;
        if(completed!=='false' || completed!=='true'){
            const errors=this.state.errors;
            errors.completed='Invalid entry';
            return (
                this.setState(errors)
            )
        }
        switch(requestType){
            case 'post':
                return console.log("POST",description)
            case 'put':
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
            <label for="Description">Description:</label>
            <input name='description' class="form-control" placeholder="" id="description" />
            <label for="completed">Completed:</label>
            <input name='completed' class="form-control" placeholder="true/false" id="completed" />
            
            </div>
            <button type="submit" class="btn btn-primary">Add</button>
            </form>
        </div>
        );
    }
}

export default TaskForm;