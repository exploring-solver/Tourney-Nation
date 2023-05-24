import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Tournaments from './components/Tournaments';
import Signup from './components/Signup';
import Login from './components/Login';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      {loggedIn ? <Navbar setLoggedIn={setLoggedIn} /> : <Navbar/>}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/tournaments" element={<Tournaments />} />   
        <Route
          exact
          path="/login"
          element={<Login setLoggedIn={setLoggedIn} />}
        />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
}


export default App;
