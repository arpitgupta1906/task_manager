import React, { Component } from 'react';
import './SingleTask.css'

class SingleTask extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        const {task}=this.props
        const completed=task.completed?"true": "false"
        return (
            <div >
                <div class="card">
                <div class="card-header">{task.createdAt}</div>
                <div class="card-body">
                <div class="Topic">
                    <h6 class="headertab">Description:</h6>
                    {task.description}

                </div>
                <div class="Topic">
                    <h6 class="headertab">Completed:</h6>
                    {completed}  
                </div>
                </div>
                <div class="card-footer">
                <button type="button" class="btn btn-primary">Update</button>
                <button type="button" class="btn btn-danger">Delete</button>
                </div>
                </div>
            </div>
        );
    }
}

export default SingleTask;