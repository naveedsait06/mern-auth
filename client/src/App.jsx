import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className='relative min-h-screen w-full flex flex-col items-center bg-[#030303] selection:bg-blue-500/30'>
      
      {/* Toast notifications will now appear globally */}
      <ToastContainer theme="dark" position="bottom-right" />

      {/* Background Animated Gradients */}
      <div className='fixed inset-0 z-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse'></div>
        <div className='absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/5 blur-[120px]'></div>
      </div>

      {/* Grainy Texture */}
      <div className='fixed inset-0 z-1 opacity-[0.02] pointer-events-none bg-[url("https://grainy-gradients.vercel.app/noise.svg")]'></div>

      <Navbar />

      <main className='relative z-10 w-full flex flex-col items-center'>
        <Routes>
          <Route path='/' element={<div className='pt-32 pb-20 w-full flex flex-col items-center'><Header /></div>} />
          <Route path='/login' element={<Login />} />
          <Route path='/email-verify' element={<EmailVerify />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </main>
      
    </div>
  )
}

export default App