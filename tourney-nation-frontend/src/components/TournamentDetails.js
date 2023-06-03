import React, { useContext, useState } from 'react';
import cardbg from '../images/dummy-bg-card.jpg';
import TournamentContext from '../Context/Tournaments/tournamentContext';
import { useNavigate } from 'react-router-dom';
import EditTournament from './EditTournament';

const TournamentDetails = ({ tournament, handleBack }) => {
  const navigate = useNavigate();
  const context = useContext(TournamentContext);
  const { deleteTournament } = context;

  const [editing, setEditing] = useState(false);

  const handleDelete = async () => {
    try {
      // Delete the tournament
      await deleteTournament(tournament._id);

      // Redirect to /tournaments
      navigate('/tournaments');
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
  };

  if (editing) {
    return (
      <EditTournament
        tournamentProp={tournament}
        handleBack={handleBack}
        handleSave={handleSave}
      />
    );
  }

  return (
    <div className="tournament-landing bg-slate-800 pb-10">
      <div className="flex w-[90%]">
        <div className="flex flex-col gap-2 w-[80%] m-auto">
          <button
            className="text-white font-semibold text-lg px-4 py-2 border-2 border-transparent hover:border-white hover:bg-black rounded-sm bg-indigo-900 my-4"
            onClick={handleBack}
          >
            Back
          </button>
          <div className="bg-zinc-800 py-2 text-gray-300 rounded-md">
            <img className="bg-center w-72 h-24 bg-cover" src={cardbg} alt="" />
            <p className="font-mono font-semibold px-5 text-center py-3 text-indigo-500 text-2xl">
              {tournament.title}
            </p>
            <p>
              <span className="text-[1.1rem] px-5 font-semibold text-indigo-400">Game: </span>
              {tournament.game}
            </p>
            <p>
              <span className="text-[1.1rem] px-5 font-semibold text-indigo-400">Description:</span>
              {tournament.description}
            </p>
            <p>
              <span className="text-[1.1rem] px-5 font-semibold text-indigo-400">Date: </span>
              {tournament.date}
            </p>
            <p>
              <span className="text-[1.1rem] px-5 font-semibold text-indigo-400">Time: </span>
              {tournament.time}
            </p>
            <p>
              <span className="text-[1.1rem] px-5 font-semibold text-indigo-400">Number Of Participants:</span>{' '}
              {tournament.participants.length}
            </p>
            <p>
              <span className="text-[1.1rem] px-5 font-semibold text-indigo-400">Creator:</span>{' '}
              {tournament.creator.name}
            </p>
            {/* <p>
                            <span className="text-[1.1rem] px-5 font-semibold text-indigo-400">Participants:</span>{' '}
                            {participants.map((participant) => (
                                <p key={participant._id}>{participant?.name}</p>
                            ))}
                        </p> */}
            <p>
              <button
                className="m-4 text-white font-semibold text-lg px-4 py-2 border-2 w-40 border-transparent hover:border-white hover:bg-black rounded-sm bg-indigo-900 my-4"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="m-4 text-white font-semibold text-lg px-4 py-2 border-2 w-40 border-transparent hover:border-white hover:bg-black rounded-sm bg-indigo-900 my-4"
                onClick={handleDelete}
              >
                Delete
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetails;
