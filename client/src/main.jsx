import { StrictMode } from 'react';
import ReactDOM from 'react-dom'; // Use ReactDOM instead of createRoot
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routers from './Routers'; // Import the Routers component
import { UserProvider } from './context/user';
import { StructureProvider } from './context/structure';
import { Toaster } from "@/components/ui/toaster";

// Use ReactDOM.render instead of createRoot
ReactDOM.render(
  <StrictMode>
    <UserProvider>
      <StructureProvider>
        <Router>
          <Routers />
          <Toaster />
        </Router>
      </StructureProvider>
    </UserProvider>
  </StrictMode>,
  document.getElementById('root')
);
