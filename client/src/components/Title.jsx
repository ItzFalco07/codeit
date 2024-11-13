import React from 'react';
import {PanelRight, ChevronDown} from 'lucide-react';
import {useUser} from '../context'

const Title = () => {
  const {user} = useUser();

  return (
    <div className="w-full h-[10%] relative flex items-center justify-between px-12 border-b-4 border-[#252541]">
      <p></p>
      <div className="profile cursor-pointer w-[fit-content] h-full hover:bg-hover px-3 flex items-center gap-3">
        <img src={user.image || "https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg"} alt="image" className="rounded-full w-8"/>
        <h2 className="font-medium">{user.name}</h2>
        <ChevronDown className="text-[#d9d9d9] w-5"/>
      </div>
    </div>
  );
};

export default Title;