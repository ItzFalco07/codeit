import React from 'react';
import {useUser} from '../context'
import {Plus, Github} from 'lucide-react'
import {useNavigate} from 'react-router-dom'

const Greet = () => {
  const {user} = useUser();
  const formatName = toCamel(user.name.split(' ')[0]);
  const navigate = useNavigate()

  function toCamel(text) {
    let arr = text.split('');
    let newArr = [arr[0].toUpperCase(), ...arr.slice(1)]
    return newArr.join('')
  }

  return (
    <div>
      <h1 className="text-[4em] font-bold">Hello <span className="bg-gradient-to-r from-[#DE53E3] to-[#48285E] bg-clip-text text-transparent">{formatName}</span></h1>
      <p className="text-[#d9d9d9]">lets create something incredible today</p>
      <div id="buttons" className="flex gap-12 mt-6 mb-12">
        <button onClick={()=> navigate('/editor')} className="flex transition duration-300 hover:brightness-110 gap-2 items-center bg-gradient-to-r from-[#3653BB] to-[#172B73] rounded-[10px] py-3 px-10 font-semibold tracking-wider text-sm hover:shadow-lg hover:shadow-[#3653BB]/50"><Plus /> NEW PROJECT</button>
        <button className="flex bg-sec hover:bg-hover gap-2 items-center rounded-[10px] py-3 px-10 font-semibold tracking-wider text-sm "><Github className="w-5"/> IMPORT GITHUB</button>
      </div>
    </div>
  );
};

export default Greet;