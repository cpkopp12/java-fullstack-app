import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService";
import { useAuth } from './security/AuthContext';
import { useEffect, useState } from "react";

export default function TodoComponent() {

    const { id } = useParams();

    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const [descriptionError, setDescriptionError] = useState(false);
    

    const authContext = useAuth();

    const navigate = useNavigate();

    const username = authContext.username;

    useEffect(
        () => retrieveTodos(),
        [id]
    )

    function retrieveTodos() {
        if(id != -1){
            retrieveTodoApi(username, id)
                .then(response => {
                    setDescription(response.data.description);
                    setTargetDate(response.data.targetDate);
                    console.log(response);
                })
                .catch(error => console.log(error));
        }
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleTargetDateChange(event) {
        setTargetDate(event.target.value);
    }

    function onSubmit(event) {
        event.preventDefault();
        if (description.length < 4 ) {
            setDescriptionError(true);
        } else {
            setDescriptionError(false);
                const todo ={
                    id: id,
                    username: username,
                    description: description,
                    targetDate: targetDate,
                    done: false

                };
                console.log(todo);
            if (id == -1) {
                createTodoApi(username, todo)
                    .then(response => {
                        navigate('/todos');
                    })
                    .catch(error => console.log(error));
            } else {
                
                updateTodoApi(username, id, todo)
                    .then(response => {
                        navigate('/todos');
                    })
                    .catch(error => console.log(error));
            }
            
        }
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                {descriptionError && <div className="alert alert-danger">Enter atleast 4 characters for a description</div>}
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Description</label>
                        <input className="form-control" type="text" name="description" value={description} onChange={handleDescriptionChange}/>
                    </div>
                    <div className="form-group">
                        <label>Target Date</label>
                        <input className="form-control" type="date" name="targetDate" value={targetDate} onChange={handleTargetDateChange}/>
                    </div>   
                    <button className="btn btn-primary mt-3" type="submit" >Save</button>  
                </form>
            </div>
        </div>
    )
}