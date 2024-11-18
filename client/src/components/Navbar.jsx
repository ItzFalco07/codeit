import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Home, Folder, UserRound, UsersRound, LogOut, Plus, PanelLeftClose, PanelLeft } from 'lucide-react'
import { useUser } from '../context/user'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  useSidebar,
} from '@/components/ui/sidebar'

function SidebarToggle() {
  const { open, setOpen } = useSidebar()
  
  return (
    <Button
      variant="ghost"
      className="absolute top-4 z-50 ml-[2em] left-[103%] hover:bg-hover w-[10px] p-5"
      onClick={() => setOpen(!open)}
    >
      {open ? <PanelLeftClose id="toggleIcon" /> : <PanelLeft id="toggleIcon" />}
    </Button>
  )
}

function SidebarContentComponent({ Selected, setSelected, logout }) {
  const { open } = useSidebar()

  return (
    <Sidebar
      className={`absolute top-0 left-0 h-full bg-sec transition-all duration-500 ease-in-out
                  ${open ? 'translate-x-0 ' : '-translate-x-full '}`}
      style={{
        overflow: open ? 'visible' : 'hidden', // Hide overflow when closed
      }}
    >
      <SidebarHeader className="px-4 py-6">
        <img src="/logo.png" className="w-[70%] mb-5 m-auto" alt="Logo" />
        <Button className="w-full"><Plus /> Create Project</Button>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setSelected('home')}
              className={`justify-start  ${Selected === 'home' ? 'bg-hover hover:bg-hover' : 'hover:bg-hover'}`}
            >
              <Home />
              <span>Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setSelected('projects')}
              className={`justify-start mt-2 ${Selected === 'projects' ? 'bg-hover hover:bg-hover' : 'hover:bg-hover'}`}
            >
              <Folder />
              <span>Projects</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setSelected('community')}
              className={`justify-start mt-2 ${Selected === 'community' ? 'bg-hover hover:bg-hover' : 'hover:bg-hover'}`}
            >
              <UsersRound />
              <span>Community</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setSelected('profile')}
              className={`justify-start mt-2 ${Selected === 'profile' ? 'bg-hover hover:bg-hover' : 'hover:bg-hover'}`}
            >
              <UserRound />
              <span>Profile</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="px-4 py-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout} className="justify-start hover:bg-">
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default function Component({ Selected, setSelected }) {
  const { user } = useUser()
  const serverUrl = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate()

  const logout = async () => {
    try {
      console.log("logout called")
      let res = await axios.get(`${serverUrl}/api/logout`, { withCredentials: true })
      if (res.data.message === "success") {
        navigate('/login')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="relative h-full">
        <SidebarContentComponent Selected={Selected} setSelected={setSelected} logout={logout} />
        <SidebarToggle />
      </div>
    </SidebarProvider>
  )
}
