// context/structure.jsx
import React, { createContext, useState, useContext } from 'react';

// Create context
const CodeContext = createContext();

// Create provider component
export const CodeProvider = ({ children }) => {
  const [Code, setCode] = useState('');

  return (
    <CodeContext.Provider value={{ Code, setCode }}>
      {children}
    </CodeContext.Provider>
  );
};

// Custom hook to use the context
export const useCode = () => useContext(CodeContext);