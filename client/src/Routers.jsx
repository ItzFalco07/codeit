import {Routes, Route, useNavigate} from 'react-router-dom';
import Form from './pages/Form'
import App from './pages/App'
import { ThemeProvider } from "@/components/theme-provider"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { useUser } from './context';
import Editor from './pages/Editor'

function Routers() {
  let navigate = useNavigate()
  const serverUrl = import.meta.env.VITE_BACKEND_URL
  const { setUser } = useUser();

  useEffect(()=> {
    async function isLogin() {
      let res = await axios.get(`${serverUrl}/api/islogin`, {withCredentials: true})
      if(!res.data.error) {
        console.log(res.data)
        navigate('/home')
        setUser({name: res.data.name, email: res.data.email, image: res.data.image})
      } else {
        navigate('/login')
      }
    }
    isLogin()
  }, [])

  return ( 
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
            <Route path="/login" element={<Form/>} />
            <Route path="/home" element={<App/>} />
            <Route path="/editor" element={<Editor/>} />
          </Routes>
        <ToastContainer theme="dark"/>
      </ThemeProvider>
  )
}

export default Routers
