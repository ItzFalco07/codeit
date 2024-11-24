import React, {useState, useEffect} from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import axios from 'axios';
import { useStructure } from '../context/structure';
import {useNavigate} from 'react-router-dom'
import {useProject} from '../context/project'

const ResentProjects = () => {
  let skel = new Array(4).fill(true)
  const [NoProjects, setNoProjects] = useState(false)
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [Projects, setProjects] = useState(false)
  const { Structure, setStructure } = useStructure();
  const navigate = useNavigate()
  const { setProject } = useProject();


  useEffect(()=> {
    async function getProjects() {
      try {
        const res = await axios.post(`${backendUrl}/getprojects`, {} ,{withCredentials: true})
        console.log('projects response', res.data.projectData);
        setProjects(res.data.projectData)
      } catch(error) {
        console.log(error)
      }
    }

    getProjects()
  }, [])

  setTimeout(()=> {
    if(!Projects) {
      setNoProjects(true)
    }
  }, [5000])

  async function handleOpenProject(e) {
    try {
      const res = await axios.post(`${backendUrl}/enterproject`, {projName: e.projName, Type: e.type}, {withCredentials: true})
      if(res) {
        setStructure(res.data.structure)
        setProject(res.data.project);
        navigate('/editor')
      }
    } catch(error) {
      console.log(error)
    }
  }

  function timeAgo(inputDate) {
    const date = new Date(inputDate);
    const now = new Date();

    const seconds = Math.floor((now - date) / 1000);
    if (seconds < 60) return "just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);
    if (days < 365) return `${days} day${days > 1 ? "s" : ""} ago`;

    const years = Math.floor(days / 365);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }

  return (
    <>
    <p className="font-medium">Resent Projects</p>
    {
      Projects ? (
        <div id="skeleton" className="flex flex-wrap gap-3">
        {
          Projects.map((project, index) => (
            <div onClick={() => handleOpenProject(project)} className = "relative mt-4 w-[20em] bg-[#131326] hover:bg-hover cursor-pointer h-[6em] rounded-[12px] flex items-center px-2 gap-3">
              <img src={
                (project.type == 'blank' && 'https://cdn-icons-png.flaticon.com/512/2039/2039083.png') || 
                (project.type == 'Javascript' && '/Javascript.svg') ||
                (project.type == 'html/css' && '/html.svg') ||
                (project.type == 'Node.js' && 'https://cdn.iconscout.com/icon/free/png-256/free-node-js-logo-icon-download-in-svg-png-gif-file-formats--nodejs-programming-language-pack-logos-icons-1174925.png?f=webp&w=256') ||
                (project.type == 'python' && '/python.svg')
              } className = "w-[4em] h-[4em] rounded-[12px]"/>
              <div className="flex flex-col py-5">
                <h1 className="text-xl font-medium">{project.projName}</h1>
                <p className="text-[0.8em] mt-[-4px] text-zinc-400">@{project.user} • {timeAgo(project.createdAt)}</p>
              </div>
                <div className="w-[4em] absolute right-3 top-3 h-[1.2em] rounded-[6px] bg-[#22213d] text-[0.8em] p-3 flex items-center justify-center">{project.type}</div>
            </div>
          ))
        }
        </div>
      ) : (
        <div id="skeleton" className="flex flex-wrap gap-3">
          {skel.map((_, index)=> (
          <Skeleton key={index} className=" mt-4 w-[20em] h-[6em] rounded-[12px] flex items-center px-2 gap-3"> 
            <Skeleton className="w-[5em] h-[5em] rounded-[12px]"/>
            <div>
              <Skeleton className="w-[12em] h-[1em]"/>
              <Skeleton className="w-[12em] h-[0.5em] mt-2"/>
              <Skeleton className="w-[12em] h-[0.5em] mt-2"/>          
            </div>
          </Skeleton>
          ))}
        </div>
      )
    }
    </>
  );
};

export default ResentProjects;