import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class EditTask extends Component {

    handleFormSubmit=(event,requestType)=>{
        event.preventDefault();
        const _ID=this.props.match.params.ID;
        console.log(_ID)
        const description=event.target.elements.description.value;
        let completed=event.target.elements.completed.value;
        
        completed=completed==='False'?false:true;
        console.log(completed)
        let token=localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.patch(`http://localhost:8080/tasks/${_ID}`,{
            description,
            completed
        },
        config).then((res)=>{
            this.props.history.push('/');
            this.forceUpdate();
            console.log(res.data)
        }).catch((error)=>{
            console.log(error);
        })
               
    }


    render() {
        return  (
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

export default withRouter(EditTask);