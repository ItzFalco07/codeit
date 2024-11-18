import {useState} from 'react';
import { useUser } from '../context/user';
import {Button} from '@/components/ui/button'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Home from '@/components/Home'
import Navbar from '@/components/Navbar'
import Profile from '@/components/Profile'
import Projects from '@/components/Projects'
import Community from '@/components/Community'

const App = () => {

  const [Selected, setSelected] = useState('home');

  return (
    <div className="w-screen h-screen bg-bg flex">
      <Navbar Selected={Selected} setSelected={setSelected}/>
      {
        (Selected === 'home' && <Home />) ||
        (Selected === 'profile' && <Profile />) ||
        (Selected === 'projects' && <Projects />) ||
        (Selected === 'community' && <Community/>)
      }
    </div>
  );
};

export default App;