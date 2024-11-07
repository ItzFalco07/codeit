import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import Routers from './Routers'; // Import the Routers component
import { UserProvider } from './context';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <Router>
        <Routers />
      </Router>
    </UserProvider>
  </StrictMode>,
)
