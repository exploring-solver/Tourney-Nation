import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Tournaments from './components/Tournaments';
import Signup from './components/Signup';
import Login from './components/Login';
import Footer from './components/Footer';
import { useState } from 'react';
import TournamentState from './Context/Tournaments/TournamentState';
import Community from './components/Community';
import Events from './components/Events';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const updateLogin = (isLoggedIn) => {
    setLoggedIn(isLoggedIn);
  };

  // const handleNavigateToProtectedRoute = () => {
  //   setShowModal(true);
  // };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <Router>
      {/* this is used there so that navbar can be toggled when user is logged in */}
      {loggedIn ? <Navbar loggedIn={loggedIn} updateLogin={updateLogin} /> : <Navbar />}
      <TournamentState>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home />}
          />
          <Route 
            exact
            path="/about"
            element={<About />}
          />
          <Route
            exact
            path="/events"
            element={<Events />}
          />
          <Route
            exact
            path="/community"
            element={<Community />}
          />
          <Route
            exact
            path="/tournaments"
            element={loggedIn ? <Tournaments /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/login"
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <Login loggedIn={loggedIn} updateLogin={updateLogin} />
              )
            }
          />
          <Route
            exact
            path="/signup"
            element={<Signup />}
          />
        </Routes>
      </TournamentState>
      <Footer />

      {/* Modal for login prompt */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Please login to continue</h2>
            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;

