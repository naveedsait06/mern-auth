import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContext } from '../context/AppContext'

const ResetPassword = () => {
    const { backendUrl } = useContext(AppContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [otp, setOtp] = useState('')
    const [isEmailSent, setIsEmailSent] = useState(false)

    // Using a ref for OTP inputs if you want to do the individual box style, 
    // but for now, we'll use a single input for simplicity.
    
    axios.defaults.withCredentials = true;

    const onSubmitEmail = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email });
            if (data.success) {
                toast.success(data.message);
                setIsEmailSent(true); 
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const onSubmitOTP = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(backendUrl + '/api/auth/reset-password', { email, otp, newPassword });
            if (data.success) {
                toast.success(data.message);
                navigate('/login');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen w-full px-6 bg-slate-900'>
            <div className='relative z-10 w-full max-w-md p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-2xl'>
                
                {!isEmailSent ? (
                    /* Step 1: Enter Email */
                    <form onSubmit={onSubmitEmail} className='text-center'>
                        <h2 className='text-3xl font-black text-white tracking-tighter mb-2 uppercase'>Reset Password</h2>
                        <p className='text-white/40 text-sm mb-10 font-light'>Enter your registered email address.</p>
                        
                        <div className='flex items-center gap-3 w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white group focus-within:border-blue-500/50 transition-all mb-8'>
                            <img src={assets.mail_icon} alt="" className='w-5 opacity-30 group-focus-within:opacity-100 transition-opacity'/>
                            <input 
                                type="email" 
                                placeholder='Email Address' 
                                className='bg-transparent outline-none w-full placeholder:text-white/20 text-sm' 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button className='w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-500 cursor-pointer uppercase tracking-widest text-xs'>
                            Send Reset Link
                        </button>
                    </form>
                ) : (
                    /* Step 2: Enter OTP & New Password */
                    <form onSubmit={onSubmitOTP} className='text-center'>
                        <h2 className='text-3xl font-black text-white tracking-tighter mb-2 uppercase'>Set New Password</h2>
                        <p className='text-white/40 text-sm mb-10 font-light'>Enter the OTP sent to your email and your new password.</p>
                        
                        {/* OTP Input */}
                        <div className='flex items-center gap-3 w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white group focus-within:border-blue-500/50 transition-all mb-4'>
                            <input 
                                type="text" 
                                placeholder='6-Digit OTP' 
                                className='bg-transparent outline-none w-full placeholder:text-white/20 text-sm text-center tracking-[1rem]' 
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength='6'
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className='flex items-center gap-3 w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white group focus-within:border-blue-500/50 transition-all mb-8'>
                            <img src={assets.lock_icon} alt="" className='w-5 opacity-30 group-focus-within:opacity-100 transition-opacity'/>
                            <input 
                                type="password" 
                                placeholder='New Password' 
                                className='bg-transparent outline-none w-full placeholder:text-white/20 text-sm' 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button className='w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-500 cursor-pointer uppercase tracking-widest text-xs'>
                            Submit New Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default ResetPassword