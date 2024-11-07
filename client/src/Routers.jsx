import {Routes, Route, useNavigate} from 'react-router-dom';
import Form from './pages/Form'
import App from './pages/App'
import { ThemeProvider } from "@/components/theme-provider"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { useUser } from './context';

function Routers() {
  let navigate = useNavigate()
  const serverUrl = import.meta.env.VITE_BACKEND_URL
  const { setUser } = useUser();

  useEffect(()=> {
    async function isLogin() {
      console.log('serverUrl', serverUrl)
      let res = await axios.get(`${serverUrl}/api/islogin`, {withCredentials: true})
      console.log(res)
      if(res.data) {
        navigate('/home')
        setUser({name: res.data.Name, email: res.data.Email})
        console.log(res.data)
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
          </Routes>
        <ToastContainer theme="dark"/>
      </ThemeProvider>
  )
}

export default Routers
