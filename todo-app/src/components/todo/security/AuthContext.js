import { createContext, useState } from 'react';
import { useContext } from 'react';
import { executeBasicAuthenticationService } from '../api/TodoApiService';
import { apiClient } from '../api/ApiClient';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {

    const [isAuthenticated, setAuthenticated] = useState(false);

    const [username, setUsername] = useState(null);

    const [token, setToken] = useState(null);


    // function login(username, password) {
    //     if (username === 'cam' && password==='dummy') {
    //         setAuthenticated(true);
    //         setUsername(username);
    //         return true;
    //     } else {
    //         setAuthenticated(false);
    //         setUsername(null);
    //         return false;
    //     }
    // }

    async function login(username, password) {

        const baToken = 'Basic ' + window.btoa(username+":"+password);

        try {
            const response = await executeBasicAuthenticationService(baToken);
            

            if (response.status === 200) {
                setAuthenticated(true);
                setUsername(username);
                setToken(baToken);

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding token');
                        config.headers.Authorization = baToken;
                        return config;
                    }
                )

                return true;
            } else {
                logout();
                return false;
            }
        } catch(error) {
            logout();
            return false;
        }

        
    }


    function logout() {
        setAuthenticated(false);
        setToken(null);
        setUsername(null);
    }

    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username, token} }>
            {children}
        </AuthContext.Provider>
    )
}