import React, { useContext, useState } from 'react';
import TournamentContext from '../Context/Tournaments/tournamentContext';

const AddTournament = () => {
    const context = useContext(TournamentContext);
    const { addTournament } = context;

    const [tournament, setTournament] = useState({
        title: '',
        game: '',
        description: '',
        date: '',
        time: '',
    });

    const handleClick = (e) => {
        e.preventDefault();
        addTournament(
            tournament.title,
            tournament.game,
            tournament.description,
            tournament.date,
            tournament.time
        );
        setTournament({
            title: '',
            game: '',
            description: '',
            date: '',
            time: '',
        });

        // Show success alert
        window.alert('Tournament added successfully!');
    };

    const onChange = (e) => {
        setTournament({ ...tournament, [e.target.name]: e.target.value });
    };

    return (
        <div className="tournament-landing bg-slate-800 pb-10">
            <div className="w-[50%] m-auto flex flex-col gap-3">
                <h1 className="text-2xl font-mono font-bold mb-2 text-indigo-600">Create a Tournament</h1>
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
                                aria-describedby="emailHelp"
                                value={tournament.title}
                                onChange={onChange}
                                required
                            />
                            <input
                                type="text"
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

                    <button
                        type="submit"
                        className="text-white font-semibold text-lg px-10 py-2  rounded-sm bg-indigo-900 hover:bg-indigo-800 my-4 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-indigo-400 "
                        onClick={handleClick}
                    >
                        Add Tournament
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTournament;
