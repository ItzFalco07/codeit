// context/UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Create context
const UserContext = createContext();

// Create provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: '', email: '', image: '' });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUser = () => useContext(UserContext);
