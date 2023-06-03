import React, { useContext, useEffect } from 'react'
import TournamentName from './TournamentName'
import TournamentContext from '../Context/Tournaments/tournamentContext';
import TournamentHeader from './TournamentHeader';

const Tournaments = () => {
  const context = useContext(TournamentContext);
  const { tournaments,getAllTournaments} = context;
  // const [myTournaments, setmyTournaments] = useState(getTournaments)
  // useEffect(() => {
  //   getTournaments();
  //   // eslint-disable-next-line

  // }, []);

  useEffect(() => {
    getAllTournaments();
    // eslint-disable-next-line
    
  });
  

  return (
    <>
      <TournamentHeader/>
      <TournamentName tournaments={tournaments}/>
    </>
  )
}

export default Tournaments