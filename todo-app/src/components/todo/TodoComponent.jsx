import { useParams } from "react-router-dom"
import { retrieveTodoApi } from "./api/TodoApiService";
import { useAuth } from './security/AuthContext';
import { useEffect, useState } from "react";

export default function TodoComponent() {

    const { id } = useParams();

    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const [descriptionError, setDescriptionError] = useState(false);
    

    const authContext = useAuth();

    const username = authContext.username;

    useEffect(
        () => retrieveTodos(),
        [id]
    )

    function retrieveTodos() {
        retrieveTodoApi(username, id)
            .then(response => {
                setDescription(response.data.description);
                setTargetDate(response.data.targetDate);
                console.log(response);
            })
            .catch(error => console.log(error));
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleTargetDateChange(event) {
        setTargetDate(event.target.value);
    }

    function onSubmit(event) {
        event.preventDefault();
        console.log(description + targetDate);
        if (description.length < 4 ) {
            setDescriptionError(true);
        } else {
            setDescriptionError(false);
        }
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                {descriptionError && <div className="alert alert-danger">Enter atleast 4 characters for a description</div>}
                <form onSubmit={onSubmit}>
                    <label>Description</label>
                    <input type="text" name="description" value={description} onChange={handleDescriptionChange}/>
                    <label>Target Date</label>
                    <input type="date" name="targetDate" value={targetDate} onChange={handleTargetDateChange}/>
                    <button type="submit" >Save</button>
                </form>
            </div>
        </div>
    )
}