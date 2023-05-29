import React, { useContext, useEffect, useState } from 'react'
import cardbg from '../images/dummy-bg-card.jpg'
import TournamentContext from '../Context/Tournaments/tournamentContext'


const TournamentName = ({ tournaments}) => {

  const context = useContext(TournamentContext);
  const {getTournaments} = context ;
  const [myTournamentsBtnClicked, setmyTournamentsBtnClicked] = useState(false)
  useEffect(() =>{
    if(myTournamentsBtnClicked){
      getTournaments();
      setmyTournamentsBtnClicked(false); // Reset the button click state
    }
  } , [myTournamentsBtnClicked , getTournaments]);

  const handleClick = () => {
    setmyTournamentsBtnClicked(true); // Set the button click state to true
  };

  return (
    <div className="tournament-landing bg-slate-800 pb-10">
      <div className="w-[80%] m-auto">
        <div className=' flex justify-between item-center'>
          <h1 className="text-white text-3xl font-mono pt-9 pb-4">Tournaments</h1>
          

        </div> 
          <input
            type="text"
            className="border-2 my-4 border-transparent text-base w-56 bg-gray-700 focus:border-indigo-500 outline-none rounded-sm text-zinc-300 px-2 py-1 font-mono"
            placeholder="Search for tournaments"
          />
          <button className='bg-indigo-700 px-4 py-2 text-lg ml-10 w-30 font-semibold text-white border-2 border-transparent hover:bg-black hover:border-2 hover:border-zinc-200'>Create +</button>
          <button className='bg-indigo-700 px-4 py-2 text-lg ml-10 w-30 font-semibold text-white hover:bg-black border-2 border-transparent hover:border-2 hover:border-zinc-200' onClick={handleClick}>My Tournaments</button>
      </div>
      <div className="flex w-[80%]">
        <p className="text-white font-semibold text-sm"></p>
        <ul className=" flex gap-2 justify-between w-[80%] flex-wrap m-auto">
          {tournaments.map((tournament) => (
            <li className='bg-zinc-800  py-2 text-gray-300 w-50 rounded-md' key={tournament._id}>
              <img className='bg-center w-72 h-24 bg-cover' src={cardbg} alt="" />
              <p className='font-mono font-semibold px-5 text-center py-3  text-indigo-500 text-2xl'>{tournament.title}</p>
              <p ><span className='text-[1.1rem] px-5 font-semibold text-indigo-400'>Title:</span>{tournament.description}</p>
              <p ><span className='text-[1.1rem] px-5 font-semibold text-indigo-400'>Game: </span>{tournament.game}</p>
              <p ><span className='text-[1.1rem] px-5 font-semibold text-indigo-400'>Date: </span>{tournament.date}</p>
              <p ><span className='text-[1.1rem] px-5 font-semibold text-indigo-400'>Time: </span>{tournament.time}</p>
              <p ><span className='text-[1.1rem] px-5 font-semibold text-indigo-400'>Number Of Participants :</span>{tournament.participants.length}</p>
              <div className='py-4 flex justify-between px-5'>
                <button className="w-20 py-2 px-6 bg-zinc-600 font-mono focus:shadow-lg focus:shadow-slate-600 hover:bg-indigo-700">Join</button>
                <button className="w-20 py-2 px-6 bg-zinc-600 font-mono focus:shadow-lg focus:shadow-slate-600 hover:bg-indigo-700">View</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TournamentName
