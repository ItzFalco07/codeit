import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, User, Github } from 'lucide-react';
import axios from 'axios';
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import { useUser } from '../context';

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [Name, setName] = useState(false);
  const [Email, setEmail] = useState(false);
  const [Password, setPassword] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate();
  const { setUser } = useUser();


  async function Signup() {
    if(Name && Email && Password) {
      let res = await axios.post(`${backendUrl}/api/signup`, {Name, Email, Password}, {withCredentials: true})
      if(res.data) {
        setUser({name: res.data.user.name, email: res.data.user.email})
        navigate('/home');
      }
    }
  }

  async function Login() {
    if(Email,Password) {
      let res = await axios.post(`${backendUrl}/api/login`, {Email, Password}, {withCredentials: true})
      console.log('login response', res)
      if(res.data.message && res.data.message == 'success') {
        setUser({name: res.data.user.name, email: res.data.user.email})
        navigate('/home');
      } else {
        console.log('login failed')
        setIsLoading(false);
        toast.error('user dont exists')
      }
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r bg-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your email to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={onSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input onChange={(e)=> setEmail(e.target.value)} id="email" type="email" placeholder="m@example.com" className="pl-10" required />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        onChange={(e)=> setPassword(e.target.value)}
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        className="pl-10 pr-10" 
                        required 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember me</Label>
                  </div>
                  <Button onClick={Login} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={onSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="name" onChange={(e)=> setName(e.target.value)} type="text" placeholder="John Doe" className="pl-10" required />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input onChange={(e)=> setEmail(e.target.value)} id="email" type="email" placeholder="m@example.com" className="pl-10" required />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        onChange={(e)=> setPassword(e.target.value)}
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        className="pl-10 pr-10" 
                        required 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute right-3 top-3 text-muted-foreground hover:text-primary"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button onClick={Signup} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing up...
                      </>
                    ) : (
                      'Sign Up'
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <div className="w-full">
            <Button
              onClick={() => {
                setIsLoading(true);  // Set loading state
                window.location.href = `${backendUrl}/auth/google`; // Redirect to Google auth route
              }}
              variant="outline"
              className="w-full h-10"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                </svg>
              )}
              Continue with Google
            </Button>

          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
