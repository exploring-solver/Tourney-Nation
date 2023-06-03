import React, { useContext, useState } from 'react';
import TournamentDetails from './TournamentDetails';
import cardbg from '../images/dummy-bg-card.jpg';
import TournamentContext from '../Context/Tournaments/tournamentContext';

const TournamentName = ({ tournaments }) => {
  const [selectedTournament, setSelectedTournament] = useState(null);
  const context = useContext(TournamentContext);
  const { joinTournament } = context;
  const handleViewDetails = (tournament) => {
    setSelectedTournament(tournament);
  };

  const handleBack = () => {
    setSelectedTournament(null);
  };

  if (selectedTournament) {
    return (
      <TournamentDetails tournament={selectedTournament} handleBack={handleBack} />
    );
  }

  return (
    <div className="tournament-landing bg-slate-800 py-10">
      <div className="flex w-[90%] m-auto">
        <p className="text-white font-semibold text-sm"></p>
        <ul className="flex gap-5 w-[90%] flex-wrap m-auto justify-center">
          {tournaments.map((tournament) => (
            <li
              className="bg-zinc-800 py-2 text-gray-300 w-[350px] rounded-md"
              key={tournament._id}
            >
              <img
                className="bg-center w-72 m-auto h-24 bg-cover"
                src={cardbg}
                alt=""
              />
              <p className="font-mono font-semibold px-5 text-center py-3 text-indigo-500 text-2xl">
                {tournament.title}
              </p>
              <p>
                <span className="text-[1.1rem] px-5 font-semibold text-indigo-400">
                  Game:{' '}
                </span>
                {tournament.game}
              </p>
              <p>
                <span className="text-[1.1rem] px-5 font-semibold text-indigo-400">
                  Description:
                </span>
                {tournament.description}
              </p>
              <p>
                <span className="text-[1.1rem] px-5 font-semibold text-indigo-400">
                  Date:{' '}
                </span>
                {tournament.date}
              </p>
              <p>
                <span className="text-[1.1rem] px-5 font-semibold text-indigo-400">
                  Time:{' '}
                </span>
                {tournament.time}
              </p>
              <p>
                <span className="text-[1.1rem] px-5 font-semibold text-indigo-400">
                  Number Of Participants :
                </span>
                
                {tournament.participants?.length || 0}
              </p>
              <div className="py-4 flex justify-between px-5">
                <button
                  className="w-20 py-2 px-6 bg-zinc-600 font-mono focus:shadow-lg focus:shadow-slate-600 hover:bg-indigo-700"
                  onClick={()=>{joinTournament(tournament._id)}}
                >
                  Join
                </button>
                <button
                  className="w-20 py-2 px-6 bg-zinc-600 font-mono focus:shadow-lg focus:shadow-slate-600 hover:bg-indigo-700"
                  onClick={() => handleViewDetails(tournament)}
                >
                  View
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TournamentName;
