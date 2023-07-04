import { createContext, useState } from 'react';
import { useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {

    const [number, setNumber] = useState(10);

    const [isAuthenticated, setAuthenticated] = useState(false);

    // setInterval(() => setNumber(number+1), 10000)

    // const valueShared = {number, isAuthenticated, setAuthenticated};

    return (
        <AuthContext.Provider value={ {number, isAuthenticated, setAuthenticated} }>
            {children}
        </AuthContext.Provider>
    )
}