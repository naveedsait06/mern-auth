import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
    const navigate = useNavigate()
    const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext)

    const [state, setState] = useState('Sign Up')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            axios.defaults.withCredentials = true;

            if (state === 'Sign Up') {
                const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password });

                if (data.success) {
                    setIsLoggedin(true);
                    await getUserData();
                    // Always redirect to verification after registration
                    navigate('/email-verify');
                    toast.success(data.message)
                } else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password });

                if (data.success) {
                    setIsLoggedin(true)
                    const userResponse = await getUserData() 
                    
                    // Check if account is verified during login
                    if (data.user && data.user.isAccountVerified) {
                        navigate('/dashboard')
                    } else {
                        navigate('/email-verify')
                    }
                    toast.success(data.message)
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='flex flex-col items-center justify-start min-h-screen w-full px-6 pt-32 pb-20 overflow-y-auto bg-slate-950'>
            <div className='relative z-10 w-full max-w-md p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-2xl transition-all duration-500'>
                <h2 className='text-3xl font-black text-white tracking-tighter text-center mb-2 uppercase'>
                    {state === 'Sign Up' ? 'CREATE ACCOUNT' : 'WELCOME BACK'}
                </h2>
                <p className='text-white/40 text-center text-sm mb-10 font-light'>
                    {state === 'Sign Up' ? 'Start your journey with Secure Systems.' : 'Enter your credentials to continue.'}
                </p>

                <form onSubmit={onSubmitHandler} className='flex flex-col gap-5'>
                    {state === 'Sign Up' && (
                        <div className='flex items-center gap-3 w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white group focus-within:border-blue-500/50 transition-all'>
                            <img src={assets.person_icon} alt="" className='w-5 opacity-30 group-focus-within:opacity-100 transition-opacity'/>
                            <input onChange={e => setName(e.target.value)} value={name} type="text" placeholder='Full Name' className='bg-transparent outline-none w-full placeholder:text-white/20 text-sm' required />
                        </div>
                    )}
                    <div className='flex items-center gap-3 w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white group focus-within:border-blue-500/50 transition-all'>
                        <img src={assets.mail_icon} alt="" className='w-5 opacity-30 group-focus-within:opacity-100 transition-opacity'/>
                        <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Email Address' className='bg-transparent outline-none w-full placeholder:text-white/20 text-sm' required />
                    </div>
                    <div className='flex items-center gap-3 w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white group focus-within:border-blue-500/50 transition-all'>
                        <img src={assets.lock_icon} alt="" className='w-5 opacity-30 group-focus-within:opacity-100 transition-opacity'/>
                        <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='Password' className='bg-transparent outline-none w-full placeholder:text-white/20 text-sm' required />
                    </div>

                    {state === 'Login' && (
                        <p onClick={() => navigate('/reset-password')} className='text-xs text-blue-400 text-right cursor-pointer hover:text-blue-300 transition-colors'>
                            Forgot password?
                        </p>
                    )}

                    <button className='mt-4 w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-500 cursor-pointer shadow-xl active:scale-95 uppercase tracking-widest text-xs'>
                        {state === 'Sign Up' ? 'SIGN UP' : 'LOGIN'}
                    </button>
                </form>

                <div className='mt-10 text-center'>
                    <p className='text-white/30 text-xs tracking-wide uppercase font-bold'>
                        {state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"} {' '}
                        <span onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')} className='text-blue-500 cursor-pointer hover:text-blue-400 ml-1 transition-colors'>
                            {state === 'Sign Up' ? 'Login' : 'Sign Up'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login