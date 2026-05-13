import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Header = () => {
    const navigate = useNavigate()
    const { isLoggedin } = useContext(AppContext)

    const handleGetStarted = () => {
        if (isLoggedin) {
            navigate('/dashboard')
        } else {
            navigate('/login')
        }
    }

    return (
        <div className='flex flex-col items-center text-center px-6 w-full max-w-6xl'>
            
            {/* Pill Badge */}
            <div className='mb-12 px-6 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-2xl'>
                <p className='text-[10px] uppercase tracking-[0.4em] font-bold text-blue-400'>
                    Next Gen Authentication
                </p>
            </div>

            {/* The Shimmering Headline */}
            <h1 className='text-[clamp(3rem,15vw,9rem)] font-black leading-[0.8] tracking-[-0.05em] mb-12 premium-shimmer hover:scale-[1.01] transition-transform duration-700 cursor-default'>
                SECURE <br />
                SYSTEMS.
            </h1>

            <p className='text-white/40 text-lg md:text-xl max-w-xl mb-16 font-medium tracking-tight'>
                The definitive MERN stack architecture. <br />
                Built for scale. Designed for speed.
            </p>

            {/* Buttons */}
            <div className='flex flex-col sm:flex-row items-center gap-8 mb-32'>
                <button 
                    onClick={handleGetStarted}
                    className='px-14 py-5 bg-white text-black font-black rounded-full hover:bg-blue-600 hover:text-white transition-all duration-500 cursor-pointer shadow-2xl active:scale-95'
                >
                    GET STARTED
                </button>
                
                <button 
                    onClick={() => {
                        toast.info("Documentation is currently being encrypted. Check back soon!")
                        // Smooth scroll to the feature cards
                        window.scrollTo({ top: 900, behavior: 'smooth' })
                    }}
                    className='text-white/60 font-bold hover:text-white transition-colors cursor-pointer flex items-center gap-2 group'
                >
                    Documentation <span className='group-hover:translate-x-1 transition-transform'>→</span>
                </button>
            </div>

            {/* Feature Bento Grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
                {[
                    { t: 'ULTRA SECURE', d: '256-bit encryption standard' },
                    { t: 'LIGHTNING FAST', d: 'Zero-latency response times' },
                    { t: 'OPEN SOURCE', d: 'Fully customizable logic' }
                ].map((card, i) => (
                    <div key={i} className='p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl text-left hover:bg-white/[0.05] transition-all group'>
                        <div className='w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-8 flex items-center justify-center text-blue-400 font-bold'>
                            0{i+1}
                        </div>
                        <h3 className='text-white font-bold tracking-tighter text-2xl mb-3'>{card.t}</h3>
                        <p className='text-white/30 text-sm leading-relaxed font-light'>{card.d}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Header