import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../services/authService";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    async function login(email, password) {
        try {
            const userData = await login(email, password);
            setUser(userData);
            return userData;
        } catch (error) {
            throw error;
        }
    }

    function logout() {
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext };
