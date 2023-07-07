import { useEffect, useState } from 'react';
import { retriveAllTodosByUsername, deleteTodoApi } from './api/TodoApiService';

export default function ListTodosComponent() {
    const today = new Date();
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay());

    const [todos, setTodos] = useState([]);

    const [message, setMessage ] = useState(null);

    useEffect(() => refreshTodos(), [])

    function refreshTodos() {
        retriveAllTodosByUsername('cam')
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => console.log(error))
            .finally(console.log('cleanup'));
    }

    function deleteTodo(id) {
        deleteTodoApi('cam', id)
            .then(
                () => {
                    setMessage(`Delete of todo with id = ${id} successful`);
                    refreshTodos();
                }
            )
            .catch(error => console.log(error));
    }

   

    return (
        <div className="container">
            <h1>Stuff Todo</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>description</th>
                            <th>is done?</th>
                            <th>target date</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                    </tr>
                                )
                            )
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}