import React from 'react';
// some inner components
import Title from '@/components/Title'
import Stats from '@/components/Stats' 
import ResentProjects from '@/components/ResentProjects'
import Greet from '@/components/Greet';
const Home = () => {
  return (
    <>
      <div id="mainContent" className="flex relative w-full ">
        <div id="leftContent" className="w-[70%] h-full">
          <Title/>

          <div id="content" className="w-full p-10 h-[90%] overflow-scroll">
            <Greet/>
            <ResentProjects/>
          </div>
        </div>
        <div id="rightContent" className="w-[30%] h-full ">
          <Stats/>
        </div>
      </div>
    </>
  );
};

export default Home;