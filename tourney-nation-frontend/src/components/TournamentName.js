import React from 'react'

const TournamentName = ({ tournaments }) => {
  return (
    <div className="tournament-landing bg-slate-800">
      <div className="w-[80%] m-auto">
        <h1 className="text-white text-3xl font-mono pt-9 pb-4">Tournaments</h1>
        <input
          type="text"
          className="border-2 my-4 border-transparent text-base w-56 bg-gray-700 focus:border-indigo-500 outline-none rounded-sm text-zinc-300 px-2 py-1 font-mono"
          placeholder="Search for tournaments"
        />
      </div>
      <div className="flex">
        <div className="card bg-gradient-to-r from-indigo-400 to-indigo-900">
          <p className="text-white font-semibold text-sm"></p>
          <ul className="flex flex-col">
            {tournaments.map((tournament) => (
              <li key={tournament._id}>
                <p>{tournament.name}</p>
                <p>{tournament.description}</p>
                <p>{tournament.startDate}</p>
                <p>{tournament.endDate}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TournamentName
