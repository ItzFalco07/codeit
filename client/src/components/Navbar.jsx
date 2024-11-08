import React from 'react';
import {Button} from '@/components/ui/button';
import {Home, Folder, UserRound, UsersRound, LogOut, Plus} from 'lucide-react';
import { useUser } from '../context';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Navbar = ({Selected, setSelected}) => {
  const {user} = useUser()
  const serverUrl = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate();

  async function logout() {
    try {
      console.log("logout called")
      let res = await axios.get(`${serverUrl}/api/logout`, {withCredentials: true})
      if(res.data.message == "success") {
        navigate('/login')
      }
    } catch(error) {
      console.log(error.message)
    }
  }

  return (
  	<div className="w-[14em] bg-sec h-full px-4 py-6">
      <Button className="w-full"><Plus /> Create Project</Button>

      <div className="links flex flex-col mt-6 justify-between h-[91%]">
        <div id="top" className="w-full flex flex-col gap-5">
          <Button onClick={()=> setSelected('home')} variant="ghost" className={`flex justify-start  ${Selected == 'home' ? 'bg-hover hover:bg-' : 'hover:bg-hover'}`}><Home/>Home</Button>
          <Button onClick={()=> setSelected('projects')} variant="ghost" className={`flex justify-start ${Selected == 'projects' ? 'bg-hover hover:bg-' : 'hover:bg-hover'}`}><Folder/>Projects</Button>
          <Button onClick={()=> setSelected('community')} variant="ghost" className={`flex justify-start ${Selected == 'community' ? 'bg-hover hover:bg-' : 'hover:bg-hover'}`}><UsersRound />Community</Button>
          <Button onClick={()=> setSelected('profile')} variant="ghost" className={`flex justify-start  ${Selected == 'profile' ? 'bg-hover hover:bg-' : 'hover:bg-hover'}`}><UserRound />Profile</Button>
        </div>

        <Button onClick={logout} variant="none" className="flex justify-start bottom-0"><LogOut />Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;