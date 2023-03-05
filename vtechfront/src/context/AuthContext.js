import { createContext, useEffect, useState } from "react";
import { getMyUserDataService } from "../services";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export const AuthProviderComponent = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

   
    useEffect (() => {
        localStorage.setItem("token", token);
    },[token]);

    useEffect (() => {
        const getMyUserData = async () => {
            try{
                const data = await getMyUserDataService({ token })
                setUser(data);
             }catch(error){
                logout();
            }
        }
        if(token) getMyUserData()
    }, [token]);

    const login = (token) => {
        setToken(token);
    };
     
    const logout = () => {
        setToken('');
        setUser(null);
        navigate("/")
    };

    return(
         <AuthContext.Provider value={{ token, user, login,logout }}>{children}</AuthContext.Provider>
    );
};


