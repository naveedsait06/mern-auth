import React, { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { isLoggedin, userData } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedin) {
            // Check verification status before deciding where to send the user
            if (userData && userData.isAccountVerified) {
                navigate('/dashboard');
            } else {
                navigate('/email-verify');
            }
        }
    }, [isLoggedin, userData, navigate]);

    // Prevent render if navigating
    if (isLoggedin) return null;

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
            <Navbar />
            <Header />
        </div>
    )
}

export default Home