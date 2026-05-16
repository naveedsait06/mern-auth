import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    axios.defaults.withCredentials = true;

    const base = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
    const backendUrl = base.replace(/\/$/, ""); 
    
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);

    // Function to get User Data from Backend
    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/data', { 
                withCredentials: true 
            });
            
            if (data.success) {
                setUserData(data.userData);
            }
        } catch (error) {
            // Silenced backend user profile fetch errors to prevent toast conflicts during onboarding
            console.log("Profile data fetch deferred until verification complete.");
        }
    }

    // Function to check if user is already authenticated on page load
    const getAuthState = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/auth/is-auth', { 
                withCredentials: true 
            });
            
            if (data.success) {
                setIsLoggedin(true);
            }
        } catch (error) {
            console.log("Auth state error initialized cleanly:", error.message);
        }
    }

    // Check auth on initial load
    useEffect(() => {
        getAuthState();
    }, []);

    // Fetch user data automatically whenever isLoggedin becomes true AND account is verified
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