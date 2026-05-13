import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const { userData, isLoggedin } = useContext(AppContext)
    const navigate = useNavigate()

    // Bouncer logic: Redirect if unverified
    useEffect(() => {
        if (isLoggedin && userData && !userData.isAccountVerified) {
            navigate('/email-verify');
        }
    }, [isLoggedin, userData, navigate]);

    return (
        <div className='flex flex-col items-center justify-start min-h-screen w-full px-6 pt-32 pb-20 bg-slate-900'>
            
            {/* Header / Greeting */}
            <div className='flex flex-col items-center text-center mb-16'>
                <div className='w-24 h-24 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-6 shadow-[0_0_40px_rgba(37,99,235,0.3)]'>
                    {userData ? userData.name[0].toUpperCase() : 'U'}
                </div>
                <h1 className='text-4xl md:text-6xl font-black text-white tracking-tighter mb-4'>
                    Hey {userData ? userData.name : 'User'}!
                </h1>
                <p className='text-white/40 text-sm md:text-base font-light tracking-[0.2em] uppercase'>
                    System Status: <span className='text-emerald-400 font-bold'>Operational</span>
                </p>
            </div>

            {/* Dashboard Bento Grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl'>
                
                {/* Main Account Security Card */}
                <div className='md:col-span-2 p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl group hover:border-blue-500/30 transition-all duration-500'>
                    <div className='flex justify-between items-start mb-12'>
                        <div>
                            <h3 className='text-white font-bold text-3xl tracking-tight mb-3'>Account Security</h3>
                            <p className='text-white/30 text-sm max-w-xs'>Your data is encrypted and protected by MERN-Stack Shield technology.</p>
                        </div>
                        <div className='flex flex-col items-end gap-2'>
                            <span className='px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-widest'>
                                Verified
                            </span>
                        </div>
                    </div>
                    
                    <div className='flex gap-4'>
                        <button className='px-8 py-4 bg-white text-black rounded-2xl text-xs font-black hover:bg-blue-600 hover:text-white transition-all cursor-pointer uppercase tracking-widest'>
                            Security Settings
                        </button>
                        <button className='px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl text-xs font-bold hover:bg-white/10 transition-all cursor-pointer uppercase tracking-widest'>
                            Activity Logs
                        </button>
                    </div>
                </div>

                {/* Profile Card */}
                <div className='p-10 rounded-[3rem] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 backdrop-blur-3xl hover:border-purple-500/30 transition-all duration-500'>
                    <h3 className='text-white/40 font-bold text-[10px] mb-8 uppercase tracking-[0.3em]'>System Identity</h3>
                    <div className='space-y-8'>
                        <div className='group'>
                            <p className='text-[10px] text-white/20 uppercase font-black mb-2 tracking-widest'>Registered Email</p>
                            <p className='text-white text-sm font-medium truncate group-hover:text-blue-400 transition-colors'>
                                {userData ? userData.email : 'loading...'}
                            </p>
                        </div>
                        <div>
                            <p className='text-[10px] text-white/20 uppercase font-black mb-2 tracking-widest'>Account Type</p>
                            <p className='text-white text-sm font-medium bg-white/5 inline-block px-3 py-1 rounded-lg'>Developer Mode</p>
                        </div>
                    </div>
                </div>

                {/* Integration Card (Small) */}
                <div className='p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center text-center hover:bg-white/[0.04] transition-all cursor-pointer'>
                    <div className='w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-4'>
                        <img src={assets.mail_icon} className='w-5 opacity-50' alt="" />
                    </div>
                    <p className='text-white font-bold text-sm mb-1'>Email Alerts</p>
                    <p className='text-white/20 text-[10px] uppercase tracking-tighter'>Active</p>
                </div>

                {/* Sessions Card */}
                <div className='md:col-span-2 p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex items-center justify-between hover:bg-white/[0.04] transition-all'>
                    <div className='flex items-center gap-6'>
                        <div className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse'></div>
                        <div>
                            <p className='text-white font-bold text-sm'>Current Active Session</p>
                            <p className='text-white/20 text-xs'>Localhost:5173 — Windows 11</p>
                        </div>
                    </div>
                    <p className='text-white/40 text-[10px] font-mono'>192.168.1.1</p>
                </div>

            </div>
        </div>
    )
}

export default Dashboard