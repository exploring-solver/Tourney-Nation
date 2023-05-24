import React, { useContext, useEffect, useRef, useState } from 'react'
import TournamentName from './TournamentName'
import TournamentContext from '../Context/Tournaments/tournamentContext';

const Tournaments = () => {
  const context = useContext(TournamentContext);
  const { tournaments, getTournaments, editTournament } = context;

  useEffect(() => {
    getTournaments();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [tournament, setTournament] = useState({ id: "", name: "", description: "", startDate: "", endDate: "" });
  const updateTournament = (currentTournament) => {
    ref.current.click();
    setTournament({ id: currentTournament._id, name: currentTournament.name, description: currentTournament.description, startDate: currentTournament.startDate, endDate: currentTournament.endDate });
  }

  const handleClick = (e) => {
    editTournament(tournament.id, tournament.name, tournament.description, tournament.startDate, tournament.endDate);
    refClose.current.click();
  }

  const onChange = (e) => {
    setTournament({ ...tournament, [e.target.name]: e.target.value });
  }
  return (
    <>
      <TournamentName />
    </>
  )
}

export default Tournaments
