import axios from 'axios'; 

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)

export const retriveAllTodosByUsername = 
    (username) => apiClient.get(`/users/${username}/todos`);