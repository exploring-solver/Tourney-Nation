import TournamentContext from "./tournamentContext";
import { useState } from "react";

const TournamentState = (props) => {
  const host = "https://tourney-nation-backend.onrender.com"
  const tournamentsInitial = []
  const [tournaments, setTournaments] = useState(tournamentsInitial)

  //get all tournaments created
  const getAllTournaments = async () => {
    try {
      const response = await fetch(`${host}/api/tournaments/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setTournaments(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  

  // Get all Tournaments for a user
  const getTournaments = async () => {
    // Retrieve auth token from local storage
    const authToken = localStorage.getItem('authtoken');
    // API Call 
    const response = await fetch(`${host}/api/tournaments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authToken
      } 
    });
    const json = await response.json()
    setTournaments(json)
  }

  // Add a Tournament
  const addTournament = async (name, description, date) => {
    // TODO: API Call
    const authToken = localStorage.getItem('authtoken');
    // API Call 
    const response = await fetch(`${host}/api/tournaments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authToken
      },
      body: JSON.stringify({ name, description, date })
    });

    const tournament = await response.json();
    setTournaments(tournaments.concat(tournament))
  }

  // Delete a Tournament
  const deleteTournament = async (id) => {
    const authToken = localStorage.getItem('authtoken');
    // API Call
    const response = await fetch(`${host}/api/tournaments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authToken
      }
    });
    const newTournaments = tournaments.filter((tournament) => { return tournament._id !== id })
    setTournaments(newTournaments)
    console.log(response)
  }

  // Edit a Tournament
  const editTournament = async (id, name, description, date) => {
    const authToken = localStorage.getItem('authtoken');
    // API Call 
    const response = await fetch(`${host}/api/tournaments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authToken
      },
      body: JSON.stringify({ name, description, date })
    });
    const json = await response.json();
    console.log(json)

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

  // include the tournaments state
  const contextValue = {
    tournaments,
    getTournaments,
    addTournament,
    deleteTournament,
    editTournament,
    getAllTournaments
  };

  return (
    <TournamentContext.Provider value={contextValue}>
      {props.children}
    </TournamentContext.Provider>
  );

}
export default TournamentState;
