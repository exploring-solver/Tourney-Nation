import TournamentContext from "./tournamentContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom"


const TournamentState = (props) => {
  const navigate = useNavigate();
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

  // Get a Tournament By Id
  const getTournamentById = async (id) => {
    try {
      const authToken = localStorage.getItem('authtoken');
      // API Call
      const response = await fetch(`${host}/api/tournaments/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
        }
      });
      const data = await response.json();
  
      if (response.ok) {
        // Tournament found and returned successfully
        console.log(data); // handle the retrieved tournament data here
      } else if (response.status === 404) {
        // Tournament not found
        console.log('Tournament not found');
      } else if (response.status === 401) {
        // User not allowed to access this tournament
        console.log('Not allowed');
      } else {
        // Other errors
        console.log('Error: ', data);
      }
    } catch (error) {
      console.error('Internal server error: ', error.message);
    }
  };
  


  // Add a Tournament
  const addTournament = async (title, game, description, date, time) => {
    const authToken = localStorage.getItem('authtoken');
    const response = await fetch(`${host}/api/tournaments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken
      },
      body: JSON.stringify({ title, game, description, date, time })
    });
  
    const tournament = await response.json();
    setTournaments(tournaments.concat(tournament));
    
  };
  
  //Delete a tournament
  const deleteTournament = async (id) => {
    
    try {
      const authToken = localStorage.getItem('authtoken');
      // API Call
      const response = await fetch(`${host}/api/tournaments/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": authToken
        }
      });
  
      if (response.ok) {
        // Tournament deleted successfully
        const data = await response.json();
        const deletedTournament = data.tournament;
        
        const newTournaments = tournaments.filter((tournament) => tournament._id !== deletedTournament._id);
        setTournaments(newTournaments);
        alert('Tournament has been deleted');
        navigate('/tournaments');
      } else {
        // Handle the error if deleting the tournament failed
        const errorMessage = await response.text();
        console.error(errorMessage);
        if (errorMessage === 'Not allowed') {
          // Show already joined alert
          alert('You are not authorized to delete the tournament');
        } else {
          // Show generic error alert
          alert('Failed to delete the tournament');
        }
      }
    } catch (error) {
      console.error(error.message);
      // Handle any other errors
      alert('An error occurred while deleting the tournament');
    }
  };
  

  // Edit a Tournament
  const editTournament = async (id, title, game, description, date, time) => {
    const authToken = localStorage.getItem('authtoken');
    try {
      // Create a new object without circular references
      const tournamentData = {
        title,
        game,
        description,
        date,
        time
      };
  
      // API Call
      const response = await fetch(`${host}/api/tournaments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
        },
        body: JSON.stringify(tournamentData)
      });
  
      if (response.ok) {
        const data = await response.json();
        const updatedTournament = data.tournament;
  
        setTournaments(prevTournaments => {
          return prevTournaments.map(tournament => {
            if (tournament._id === updatedTournament._id) {
              return updatedTournament;
            }
            return tournament;
          });
        });
  
        // Redirect to '/tournaments' after updating
        // window.location.href = '/tournaments';
        alert('Changes Saved');
      } else {
        const errorMessage = await response.text();
        console.log(errorMessage);
        if (errorMessage === 'Not authorized to update this tournament') {
          // Show already joined alert
          alert('You are not authorized to edit the tournament');
        } else {
          // Show generic error alert
          alert('Failed to Save the Changes');
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  
  

  const joinTournament = async (tournamentId) => {
    try {
      const authToken = localStorage.getItem('authtoken');
      const response = await fetch(`${host}/api/tournaments/${tournamentId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
        }
      });
  
      if (response.ok) {
        // Tournament joined successfully
        const tournament = await response.json();
        setTournaments(tournaments.concat(tournament));
        // Show success alert
        alert('Tournament joined!');
      } else {
        // Handle the error if joining the tournament failed
        const errorMessage = await response.text();
        if (errorMessage === 'You have already joined this tournament') {
          // Show already joined alert
          alert('You have already joined the tournament');
        } else {
          // Show generic error alert
          alert('Failed to join the tournament');
        }
      }
    } catch (error) {
      console.error(error.message);
      // Handle any other errors
      alert('An error occurred while joining the tournament');
    }
  };
  
  


  // include the tournaments state
  const contextValue = {
    tournaments,
    getTournaments,
    addTournament,
    deleteTournament,
    editTournament,
    getAllTournaments,
    getTournamentById,
    joinTournament
  };
  
  return (
    
    <TournamentContext.Provider value={contextValue}>
      {props.children}
    </TournamentContext.Provider>
  );

}
export default TournamentState;
