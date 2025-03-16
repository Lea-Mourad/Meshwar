import React, { createContext, useContext, useState, useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    return isAdmin ? children : <Navigate to="/admin-login" />;
  };

  
export default ProtectedRoute;