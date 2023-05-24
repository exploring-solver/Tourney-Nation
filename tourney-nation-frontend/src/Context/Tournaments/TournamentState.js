import TournamentContext from "./tournamentContext";
import { useState } from "react";

const TournamentState = (props) => {
  const host = "http://localhost:5000"
  const tournamentsInitial = []
  const [tournaments, setTournaments] = useState(tournamentsInitial)

  // Get all Tournaments
  const getTournaments = async () => {
    // API Call 
    const response = await fetch(`${host}/api/tournaments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0NTI0Zjk3YmJjMDIzMWQzYmU2NTQ0In0sImlhdCI6MTY4MzMwMzQ5OSwiZXhwIjoxNjgzMzA3MDk5fQ.Cv6I4fbbYr4hETWZyp9ZNJBg4hl4_KyVt4hSIqbJx6E"
      }
    });
    const json = await response.json()
    setTournaments(json)
  }

  // Add a Tournament
  const addTournament = async (name, description, date) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/tournaments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "your-auth-token"
      },
      body: JSON.stringify({name, description, date})
    });

    const tournament = await response.json();
    setTournaments(tournaments.concat(tournament))
  }

  // Delete a Tournament
  const deleteTournament = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/tournaments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "your-auth-token"
      }
    });
    const json = response.json(); 
    const newTournaments = tournaments.filter((tournament) => { return tournament._id !== id })
    setTournaments(newTournaments)
  }

  // Edit a Tournament
  const editTournament = async (id, name, description, date) => {
    // API Call 
    const response = await fetch(`${host}/api/tournaments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "your-auth-token"
      },
      body: JSON.stringify({name, description, date})
    });
    const json = await response.json(); 

     let newTournaments = JSON.parse(JSON.stringify(tournaments))
    // Logic to edit in client
    for (let index = 0; index < newTournaments.length; index++) {
      const element = newTournaments[index];
      if (element._id === id) {
        newTournaments[index].name = name;
        newTournaments[index].description = description;
        newTournaments[index].date = date; 
        break; 
      }
    }  
    setTournaments(newTournaments);
  }

  const contextValue = {
    tournaments, // include the tournaments state
    getTournaments,
    addTournament,
    deleteTournament,
    editTournament,
  };

  return (
    <TournamentContext.Provider value={contextValue}>
      {props.children}
    </TournamentContext.Provider>
  );

}
export default TournamentState;
