import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    async function authContext(userData) {
        try {
            if (userData) {
                setUser(userData);
                return userData;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    function logout() {
        setUser(null);
        localStorage.removeItem("user");
        navigate('/');
    }

    return (
        <UserContext.Provider value={{ user, authContext, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext };