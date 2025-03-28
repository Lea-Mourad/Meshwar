import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(!!user);
    }
  }, []);

  const login = (userCredentials) => {
    
    localStorage.setItem('user', JSON.stringify(userCredentials)); 
    setIsAuthenticated(true);  
  };

  const logout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);  
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
