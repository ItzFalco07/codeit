// context/structure.jsx
import React, { createContext, useState, useContext } from 'react';

// Create context
const structureContext = createContext();

// Create provider component
export const StructureProvider = ({ children }) => {
  const [Structure, setStructure] = useState(false);

  return (
    <structureContext.Provider value={{ Structure, setStructure }}>
      {children}
    </structureContext.Provider>
  );
};

// Custom hook to use the context
export const useStructure = () => useContext(structureContext);
