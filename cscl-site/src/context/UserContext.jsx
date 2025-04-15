import { createContext, useState } from "react";
import login from "../services/authService";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    async function authContext(token) {
        try {
            setToken(token);
            
            return token;
        } catch (error) {
            throw error;
        }
    }

    function logout() {
        setToken(null);
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ token, user, setToken, authContext, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext };