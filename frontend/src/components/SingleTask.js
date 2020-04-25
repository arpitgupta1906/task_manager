import React, { Component } from 'react';
import './SingleTask.css'
import axios from 'axios';

class SingleTask extends Component {
    

    handleDelete=()=>{
        const _id=this.props.task._id;
        console.log("captured id",_id);
        let token=localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.delete(`http://localhost:8080/tasks/${_id}`,
        config
        ).then((res)=>{
            window.location.reload();
            console.log(res.data)
        }).catch((e)=>{
            console.log(e);
        })
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
                <button type="button"  class="btn btn-primary"><a href={`/update/${task._id}`}>Update</a></button>
                <button type="button" onClick={this.handleDelete} class="btn btn-danger">Delete</button>
                </div>
                </div>
            </div>
        );
    }
}

export default SingleTask;