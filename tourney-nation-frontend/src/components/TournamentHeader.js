import React from 'react'
import { Link } from 'react-router-dom';

const TournamentHeader = ({ handleClick }) => {
    // const context = useContext(TournamentContext);

    // const { getTournaments } = context;
    // const [myTournamentsBtnClicked, setmyTournamentsBtnClicked] = useState(false)
    // const handleClick = () => {
    //     setmyTournamentsBtnClicked(true); // Set the button click state to true
    // };
    // useEffect(() => {
    //     if (myTournamentsBtnClicked) {
    //         getTournaments();
    //         setmyTournamentsBtnClicked(false); // Reset the button click state
    //     }
    // }, [myTournamentsBtnClicked, getTournaments]);

    return (

        <>
            <div className='bg-slate-800'>
                <div className="w-[80%] m-auto ">
                    <div className=' flex justify-between item-center'>
                        <h1 className="text-white text-3xl font-mono pt-9 pb-4">Tournaments</h1>
                    </div>
                    <input
                        type="text"
                        className="border-2 my-4 border-transparent text-base w-56 bg-gray-700 focus:border-indigo-500 outline-none rounded-sm text-zinc-300 px-2 py-1 font-mono"
                        placeholder="Search for tournaments"
                    />
                    <Link to='/createtournament'> <button className='bg-indigo-700 px-4 py-2 text-lg ml-10 w-30 font-semibold text-white border-2 border-transparent hover:bg-black hover:border-2 hover:border-zinc-200'>Create +</button></Link>
                    <button className='bg-indigo-700 px-4 py-2 text-lg ml-10 w-30 font-semibold text-white hover:bg-black border-2 border-transparent hover:border-2 hover:border-zinc-200' onClick={handleClick}>My Tournaments</button>
                </div>
            </div>
        </>
    )
}

export default TournamentHeader