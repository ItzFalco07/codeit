import React, { useState } from 'react';
import { Bot, Terminal } from 'lucide-react';

const RightTabs = ({setSelected, Selected}) => {
  return (
  	<>
    <div className="relative w-full h-[40px] relative bg-[#1E1E1E] flex">
	    <div onClick={()=> setSelected('console')} className={`${(Selected === 'console') ?  'bg-[#0a0a0a] border-t-[2px] border-[#3b5bce]' : 'border-r-[1px] border-b-[1px] border-l-[1px] border-zinc-500  hover:bg-hover'}  w-[36%]  h-full cursor-pointer flex justify-center items-center`}>
	    	<Terminal className="w-5 h-5 mb-1 mr-1 text-[#22c55e]"/>
	    	<p className="text-[0.9em]">Console</p>
	    </div>
			<div onClick={()=> setSelected('ai')} className={`${(Selected === 'ai') ? 'bg-[#0a0a0a] border-t-[2px] border-[#3b5bce]' : 'border-r-[1px] border-b-[1px] border-l-[1px] border-zinc-500  hover:bg-hover'}  w-[36%] h-full flex items-center justify-center cursor-pointer`}>
		    <Bot className="w-5 h-5 mb-1 mr-1 text-[#3b5bce]"/>
		    <p className="text-[0.9em]">AI</p>
			</div>
    </div>
    </>
  );
};

export default RightTabs;