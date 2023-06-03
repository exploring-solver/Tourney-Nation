// {authentication is done in login and signup components}

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from './authContext';

// const AuthState = (props) => {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
  
//   const login = async (credential, password) => {
//     try {
//       const formData = { credential, password };
//       const res = await axios.post('http://localhost:5000/api/auth/login', formData);
//       localStorage.setItem('authtoken', res.data.authtoken);
//       setIsLoggedIn(true); // Update isLoggedIn state to true
//       navigate('/');
//       console.log('User logged in successfully');
//     } catch (error) {
//       alert('Invalid Credentials');
//       console.error(error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login }}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthState;
