import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true;

   // This removes any accidental trailing slashes from the environment variable
    const base = import.meta.env.VITE_BACKEND_URL;
    const backendUrl = base.replace(/\/$/, "");
    console.log("ENV URL:", base);
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);

   // Function to get User Data from Backend
const getUserData = async () => {
    try {
        // Corrected: The object MUST be inside the get() parentheses
        const { data } = await axios.get(backendUrl + '/api/user/data', { 
            withCredentials: true 
        });
        
        if (data.success) {
            setUserData(data.userData);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
}
    // Function to check if user is already authenticated on page load
   const getAuthState = async () => {
    try {
        // Corrected: Added the object as the second argument
        const { data } = await axios.get(backendUrl + '/api/auth/is-auth', { 
            withCredentials: true 
        });
        
        if (data.success) {
            setIsLoggedin(true);
        }
    } catch (error) {
        console.log("Auth state error:", error.message);
    }
}
    // Check auth on initial load
    useEffect(() => {
        getAuthState();
    }, []);

    // CRITICAL: Fetch user data automatically whenever isLoggedin becomes true
    useEffect(() => {
        if (isLoggedin) {
            getUserData();
        }
    }, [isLoggedin]);

    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserData
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};