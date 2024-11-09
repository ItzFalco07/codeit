import React from 'react';
import {PanelRight, ChevronDown} from 'lucide-react';
import {useUser} from '../context'

const Title = () => {
  const {user} = useUser();

  return (
    <div className="w-full h-[10%] relative flex items-center justify-between px-12 border-b-4 border-[#252541]">
      <PanelRight className="text-[#d9d9d9] cursor-pointer hover:opacity-[0.9]"/>
      <div className="profile cursor-pointer w-[fit-content] h-full hover:bg-hover px-3 flex items-center gap-3">
        <img src={user.image || "https://via.placeholder.com/150"} alt="image" className="rounded-full w-8"/>
        <h2 className="font-medium">{user.name}</h2>
        <ChevronDown className="text-[#d9d9d9] w-5"/>
      </div>
    </div>
  );
};

export default Title;