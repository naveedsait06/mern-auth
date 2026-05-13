import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {

    const navigate = useNavigate()
    const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext)

    // Function to send Verification OTP to the user's email
    const sendVerificationOtp = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');

            if (data.success) {
                navigate('/email-verify');
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Function to handle Logout
    const logout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/auth/logout');
            
            if (data.success) {
                setIsLoggedin(false);
                setUserData(null);
                navigate('/');
                toast.success("Logged Out");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        /* Added pointer-events-none to the container */
        <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 left-0 z-50 pointer-events-none'>
            <img 
                src={assets.logo} 
                alt="Logo" 
                className='w-10 sm:w-12 cursor-pointer pointer-events-auto' 
                onClick={() => navigate('/')} 
            />

            {userData ? (
                <div className='w-10 h-10 flex justify-center items-center rounded-full bg-indigo-600 text-white relative group cursor-pointer pointer-events-auto'>
                    {userData.name[0].toUpperCase()}
                    
                    <div className='absolute hidden group-hover:block top-full right-0 text-black pt-2 w-40 z-50'>
                        <ul className='list-none m-0 p-2 bg-white text-sm rounded-xl shadow-2xl border border-gray-200'>
                            {!userData.isAccountVerified && (
                                <li onClick={sendVerificationOtp} className='py-2 px-3 hover:bg-indigo-50 cursor-pointer transition-all border-b border-gray-100 font-semibold'>
                                    Verify Email
                                </li>
                            )}
                            <li onClick={logout} className='py-2 px-3 hover:bg-red-50 cursor-pointer transition-all font-semibold text-red-600'>
                                Logout
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <button onClick={() => navigate('/login')} className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all pointer-events-auto bg-white'>
                    Login <img src={assets.arrow_icon} alt="" className='w-3' /> 
                </button>
            )}
        </div>
    )
}

export default Navbar