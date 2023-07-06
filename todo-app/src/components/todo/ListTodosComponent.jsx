import { useEffect, useState } from 'react';
import { retriveAllTodosByUsername } from './api/TodoApiService';

export default function ListTodosComponent() {
    const today = new Date();
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay());

    const [todos, setTodos] = useState([]);

    useEffect(() => refreshTodos(), [])

    function refreshTodos() {
        retriveAllTodosByUsername('cam')
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => console.log(error))
            .finally(console.log('cleanup'));
    }

   

    return (
        <div className="container">
            <h1>Stuff Todo</h1>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>description</td>
                            <td>is done?</td>
                            <td>target date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
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