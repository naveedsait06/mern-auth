import React, { useContext, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const EmailVerify = () => {
    const navigate = useNavigate()
    const inputRefs = useRef([])
    const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContext);

    // AUTO-SEND OTP ON LOAD
    useEffect(() => {
        const autoSendOtp = async () => {
            try {
                // Only send if logged in and not verified
                if (isLoggedin && userData && !userData.isAccountVerified) {
                    // Pre-check: only send if verifyOtp is currently empty to avoid spamming
                    // You can also just call the API directly:
                    axios.defaults.withCredentials = true;
                    const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
                    if (data.success) {
                        toast.success("Verification code sent to your email!");
                    }
                }
            } catch (error) {
                toast.error(error.message);
            }
        };

        autoSendOtp();
    }, [isLoggedin, userData, backendUrl]); // Triggers when user data is available

    const handleInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const otpArray = inputRefs.current.map(input => input.value);
            const otp = otpArray.join('');
            
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp });

            if (data.success) {
                toast.success(data.message);
                await getUserData();
                navigate('/dashboard');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Bouncer: If already verified, go to dashboard
    useEffect(() => {
        if (isLoggedin && userData && userData.isAccountVerified) {
            navigate('/dashboard');
        }
    }, [isLoggedin, userData, navigate]);

    return (
        <div className='flex items-center justify-center min-h-screen w-full px-6 bg-slate-950'>
            <form onSubmit={onSubmitHandler} className='relative z-10 w-full max-w-md p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-2xl text-center'>
                <h2 className='text-3xl font-black text-white tracking-tighter mb-2 uppercase'>Verify Email</h2>
                <p className='text-white/40 text-sm mb-10 font-light'>We've sent a 6-digit code to your inbox.</p>

                <div className='flex justify-between gap-2 mb-10'>
                    {Array(6).fill(0).map((_, index) => (
                        <input 
                            key={index}
                            type="text" 
                            maxLength='1' 
                            ref={e => inputRefs.current[index] = e}
                            onInput={(e) => handleInput(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className='w-12 h-16 bg-white/5 border border-white/10 rounded-xl text-center text-2xl font-bold text-white outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all'
                            required
                        />
                    ))}
                </div>

                <button className='w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-500 cursor-pointer shadow-xl active:scale-95 uppercase tracking-widest text-xs'>
                    Verify Account
                </button>

                <p className='mt-8 text-xs text-white/30 uppercase font-bold tracking-widest'>
                    Didn't receive it? <span className='text-blue-500 cursor-pointer hover:underline ml-1' onClick={() => window.location.reload()}>Resend</span>
                </p>
            </form>
        </div>
    )
}

export default EmailVerify