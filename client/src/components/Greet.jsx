import React, {useState} from 'react';
import {useUser} from '../context/user'
import {Plus, Github} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {Input} from '@/components/ui/input';
import { useToast } from "../hooks/use-toast"
import {LoaderCircle} from 'lucide-react'
import axios from 'axios';
import { useStructure } from '../context/structure';

const Greet = () => {
  const { Structure, setStructure } = useStructure();
  const { user } = useUser();
  const formatName = toCamel(user.name.split(' ')[0]);
  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const projects = [
    {
      name: "Javascript",
      image: "/javascript.svg",
    },
    {
      name: "python",
      image: "/python.svg",
    },
    {
      name: "html/css",
      image: "/html.svg",
    },
    {
      name: "blank",
      image: "https://cdn-icons-png.flaticon.com/512/2039/2039083.png",
    },
    {
      name: "C++",
      image: "/cpp.svg",
    },
    {
      name: "Node.js",
      image: "https://cdn.iconscout.com/icon/free/png-256/free-node-js-logo-icon-download-in-svg-png-gif-file-formats--nodejs-programming-language-pack-logos-icons-1174925.png?f=webp&w=256",
    },
  ]
  const { toast } = useToast()
  const [projName, setProjName] = useState(null);
  const [Type, setType] = useState('blank');
  const [Loading, setLoading] = useState(false);

  function toCamel(text) {
    let arr = text.split('');
    let newArr = [arr[0].toUpperCase(), ...arr.slice(1)]
    return newArr.join('')
  }

  async function handleNewProject() {
    setLoading(true);
    if (!Type || !projName) {
      toast({
        title: "Project Creation Failed",
        description: "Select a language and name",
      });
      setLoading(false);
    } else {
      try {
        // Setup folder in backend
        const res = await axios.post(`${backendUrl}/createproject`, { projName, Type }, {withCredentials: true});

        if(res.data) {
          setLoading(false)
          if(res.data.project) {
            setStructure(res.data.project)
            navigate('/editor');
          }
        }
      } catch (err) {
        // Log the error response from the backend
        console.log('Error:', err);
        if (err.response) {
          console.error('Response error details:', err.response);
        }
      }
    }
  }

  return (
    <>
    <AlertDialog className="relative">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Project</AlertDialogTitle>
          <AlertDialogDescription className="pb-4">
            Select a template or start from blank project.
          </AlertDialogDescription>

          <div className="flex flex-col gap-5">
            <Input value={projName} onChange={(e)=> setProjName(e.target.value)} className="w-full h-[40px]" placeholder="enter project name"></Input>

            <ScrollArea className="sa w-full h-36 flex gap-5 overflow-x-auto">
              {
                projects.map((project,index)=> (       
                  <div onClick={()=> setType(project.name)} key={index} className={`${(project.name == Type) ? 'bg-hover hover:bg-' : "hover:bg-hover bg-zinc-900"}  w-[200px]  cursor-pointer h-[60px] flex rounded-[10px] text-white items-center px-2 gap-5`}>
                    <img src={project.image} className="h-[50px] w-[50px] rounded-[10px]"></img>
                    <div className="flex flex-col">
                      <h1 className="text-[1.3em] font-medium">{project.name}</h1>
                    </div>
                  </div>
                ))
              }
            </ScrollArea>
          </div>

        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={Loading} onClick={handleNewProject}>
            {!Loading ? 
             "Create" : 
             <>
             <p>Creating</p>
             <LoaderCircle className="animate-spin"/>
             </>
            }
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>

      <div>
        <h1 className="text-[4em] font-bold">Hello <span className="bg-gradient-to-r from-[#DE53E3] to-[#48285E] bg-clip-text text-transparent">{formatName}</span></h1>
        <p className="text-[#d9d9d9]">lets create something incredible today</p>
        <div id="buttons" className="flex gap-12 mt-6 mb-12">
          <AlertDialogTrigger asChild>
            <button className="flex transition duration-300 hover:brightness-110 gap-2 items-center bg-gradient-to-r from-[#3653BB] to-[#172B73] rounded-[10px] py-3 px-10 font-semibold tracking-wider text-sm hover:shadow-lg hover:shadow-[#3653BB]/50"><Plus /> NEW PROJECT</button>
          </AlertDialogTrigger>

          <button className="flex bg-sec hover:bg-hover gap-2 items-center rounded-[10px] py-3 px-10 font-semibold tracking-wider text-sm "><Github className="w-5"/> IMPORT GITHUB</button>
        </div>
      </div>
    </AlertDialog>
    </>
  );
};

export default Greet;