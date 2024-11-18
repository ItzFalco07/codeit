import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import Routers from './Routers'; // Import the Routers component
import { UserProvider } from './context/user';
import { StructureProvider } from './context/structure'
import { Toaster } from "@/components/ui/toaster"

createRoot(document.getElementById('root')).render(
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
)
