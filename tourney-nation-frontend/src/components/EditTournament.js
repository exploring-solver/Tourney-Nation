import React, { useContext, useEffect, useState } from 'react';
import TournamentContext from "../Context/Tournaments/tournamentContext";

const Tournaments = ({ tournamentProp ,handleBack}) => {
    const context = useContext(TournamentContext);
    const { editTournament } = context;
    // const navigate = useNavigate();
    const [tournament, setTournament] = useState({
        id: "",
        title: "",
        description: "",
        game: "",
        date: "",
        time: ""
    });

    useEffect(() => {
        setTournament({
            id: tournamentProp._id,
            title: tournamentProp.title,
            description: tournamentProp.description,
            game: tournamentProp.game,
            date: tournamentProp.date,
            time: tournamentProp.time
        });
    }, [tournamentProp]);

    const onChange = (e) => {
        setTournament({ ...tournament, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        editTournament(
            tournament.id,
            tournament.title,
            tournament.description,
            tournament.game,
            tournament.date,
            tournament.time
        );
        // Redirect to '/tournaments' after saving
        // navigate('/tournaments');
    };

    return (
        <div className="tournament-landing bg-slate-800 pb-10">
            <div className="w-[50%] m-auto flex flex-col gap-3">
                <h1 className="text-2xl font-mono font-bold mb-2 text-indigo-600">Edit Tournament Details</h1>
                <form className="my-3">
                    <div className="flex justify-between w-[400px]">
                        <div className="flex flex-col gap-6 justify-center">
                            <label htmlFor="title" className="text-indigo-400 font-semibold">
                                Title
                            </label>
                            <label htmlFor="game" className="text-indigo-400 font-semibold">
                                Game
                            </label>
                            <label htmlFor="description" className="text-indigo-400 font-semibold">
                                Description
                            </label>
                            <label htmlFor="date" className="text-indigo-400 font-semibold">
                                Date
                            </label>
                            <label htmlFor="time" className="text-indigo-400 font-semibold">
                                Time
                            </label>
                        </div>
                        <div className="flex flex-col gap-3">
                            <input
                                type="text"
                                className="mx-9 border-2 border-transparent text-sm w-52 bg-gray-600 focus:border-indigo-500 outline-none rounded-sm text-white px-2 py-1"
                                id="title"
                                name="title"
                                value={tournament.title}
                                onChange={onChange}
                                required
                            />
                            <input
                                type="text "
                                className="mx-9 border-2 border-transparent text-sm w-52 bg-gray-600 focus:border-indigo-500 outline-none rounded-sm text-white px-2 py-1"
                                id="game"
                                name="game"
                                value={tournament.game}
                                onChange={onChange}
                                required
                            />
                            <input
                                type="text"
                                className="mx-9 border-2 border-transparent text-sm w-52 bg-gray-600 focus:border-indigo-500 outline-none rounded-sm text-white px-2 py-1"
                                id="description"
                                name="description"
                                value={tournament.description}
                                onChange={onChange}
                                required
                            />
                            <input
                                type="date"
                                className="mx-9 border-2 border-transparent text-sm w-52 bg-gray-600 focus:border-indigo-500 outline-none rounded-sm text-white px-2 py-1"
                                id="date"
                                name="date"
                                value={tournament.date}
                                onChange={onChange}
                                required
                            />
                            <input
                                type="text"
                                className="mx-9 border-2 border-transparent text-sm w-52 bg-gray-600 focus:border-indigo-500 outline-none rounded-sm text-white px-2 py-1"
                                id="time"
                                name="time"
                                value={tournament.time}
                                onChange={onChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='flex'>
                        <button
                            type="submit"
                            className="m-4 text-white font-semibold text-lg px-4 py-2 border-2 w-40 border-transparent hover:border-white hover:bg-black rounded-sm bg-indigo-900 my-4" onClick={handleBack}>
                            Go Back
                        </button>
                        <button
                            type="submit"
                            className="m-4 text-white font-semibold text-lg px-4 py-2 border-2 w-40 border-transparent hover:border-white hover:bg-black rounded-sm bg-indigo-900 my-4" onClick={handleSave}>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Tournaments;
