import {  useParams, Link } from 'react-router-dom';
import { useState } from 'react';


export default function WelcomeComponent() {
    const { username } = useParams();

    const [message, setMessage] = useState(null);


    function successfulResponse(response) {
        console.log(response);
        setMessage(response.data.message);
    }

    function errorResponse(er) {
        console.log(er);
    }

    return (
        <div className="WelcomeComponent">
            <h1>Welcome to your Todo Manager {username}</h1>
            <div>
                Manage your todos. <Link to="/todos">Go here</Link>
            </div>
            <div className="text-info">{message}</div>
        </div>
        
    )
}