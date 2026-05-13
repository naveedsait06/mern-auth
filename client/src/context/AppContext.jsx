import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true;

   const backendUrl = "https://mern-auth-21ur.onrender.com"
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);

    // Function to get User Data from Backend
    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/data');
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
            const { data } = await axios.get(backendUrl + '/api/auth/is-auth');
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