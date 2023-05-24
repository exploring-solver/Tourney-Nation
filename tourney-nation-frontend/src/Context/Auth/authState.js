import { createContext, useContext, useState } from 'react';

export const AuthStateContext = createContext();

export const AuthStateProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthStateContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);
