import { createContext, useEffect, useState, useContext } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const userAuthentication = async () => {
        try {
            const response = await axios.post("/data", null, { withCredentials: true });

            if (response.status === 200) {
                // console.log("user data", response.data);
                setUser(response.data);
            }
        } catch (error) {
            console.error("Error during user authentication", error);
        }
    }

    useEffect(() => {
        userAuthentication();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
}