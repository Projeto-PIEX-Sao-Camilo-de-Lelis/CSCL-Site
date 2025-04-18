import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    async function authContext(userData) {
        try {
            if(userData){
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
        navigate('/')
    }

    return (
        <UserContext.Provider value={{ user, authContext, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext };