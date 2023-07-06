import {  useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { retriveHelloWorldBean, retriveHelloWorldPathVariable } from './api/HelloWorldApiService';

export default function WelcomeComponent() {
    const { username } = useParams();

    const [message, setMessage] = useState(null);

    function callHelloWorldRestApi() {
        retriveHelloWorldPathVariable(username)
            .then((response) => successfulResponse(response))
            .catch((error) => errorResponse(error))
            .finally(() => console.log('cleanup'));
    }

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
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>
                    Call Hello World
                </button>
            </div>
            <div className="text-info">{message}</div>
        </div>
        
    )
}