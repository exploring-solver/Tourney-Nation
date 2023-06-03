import React from 'react'
import community from '../images/community.jpg'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section>
      <div className="landing-top bg-gradient-to-r from-slate-800 to-[#696BFF] h-[550px] flex flex-col justify-center items-center gap-4 w-full">
        <p className='text-4xl text-center text-white font-mono font-semibold'>
          Host And Join Tournaments Easily
        </p>
        <p className='text-xl text-gray-300 font-mono'>
          Create and Manage Tournaments, Events and Communities
        </p>
        <div className='flex mt-7'>
          {/* <button className='border mx-4 p-2 btn draw-border hover:bg-indigo-800 text-white shadow-indigo-900 shadow-lg'>Create Tournament</button>
          <button className='border mx-4 p-2 btn draw-border hover:bg-indigo-800 text-white shadow-indigo-900 shadow-lg'>Try Bracket Generator</button> */}

          <Link to='/createtournment'><button className='text-white mx-2 font-semibold text-lg px-4 py-2 rounded-sm bg-zinc-800 hover:bg-zinc-700'>Create Tournament</button></Link>  
          <button className='text-white mx-2 font-semibold text-lg px-4 py-2  rounded-sm bg-indigo-900 hover:bg-indigo-800'>Try Bracket Generator</button>
        </div>
      </div>
      <div className="communities bg-indigo-700 flex">
        <img src={community} className='w-96' alt="" />
        <div className="container flex flex-col gap-2 justify-center">
          <p className='text-2xl text-white font-mono'>Explore Communities</p>
          <p className='text-zinc-200 text-base'>Host multiple tournaments, leagues and events for your loyal members.</p>
          <div className="flex">
            <Link to='/community'><button className='text-white mx-2 font-semibold text-lg px-4 py-2  rounded-sm bg-indigo-900 hover:bg-indigo-800'>Learn More</button></Link>
            <Link to='/community'><button className='text-white mx-2 font-semibold text-lg px-4 py-2 rounded-sm bg-zinc-800 hover:bg-zinc-700'>Find A Community</button></Link>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Home