// context/structure.jsx
import React, { createContext, useState, useContext } from 'react';

// Create context
const ProjectContext = createContext();

// Create provider component
export const ProjectProvider = ({ children }) => {
  const [Project, setProject] = useState({});

  return (
    <ProjectContext.Provider value={{ Project, setProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

// Custom hook to use the context
export const useProject = () => useContext(ProjectContext);