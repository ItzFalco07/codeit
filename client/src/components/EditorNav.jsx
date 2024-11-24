import { useState } from 'react';
import { House, PanelRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '../context/user';
import { useNavigate } from 'react-router-dom';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Input } from '@/components/ui/input';

const EditorNav = ({ setTheme, setfilesSize, setTextSize, textSize, setLanguage }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [noSize, setNoSize] = useState(false); // State to manage toggle status

  function handleFiles() {
    console.log('no size called');
    if (noSize) {
      setfilesSize(220);
    } else {
      setfilesSize(0);
    }
    setNoSize(!noSize); // Toggle noSize state
  }

  return (
    <nav className="h-[7%] bg-black items-center flex px-4 justify-between">
      <div className="flex gap-4 items-center">
        <House className="navLogo" onClick={() => navigate('/home')} />
        <PanelRight className="navLogo" onClick={handleFiles} />

        <Menubar className="h-[2em]">
          <MenubarMenu>
            <MenubarTrigger>Theme</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => setTheme('vs-dark')}>vs dark</MenubarItem>
              <MenubarItem onClick={() => setTheme('vs')}>vs light</MenubarItem>
              <MenubarItem onClick={() => setTheme('hc-black')}>hc black</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Text Size</MenubarTrigger>
            <MenubarContent>
                  <Input
                    placeholder="Text Size (px)"
                    type="number"
                    value={textSize} // Bind value to state
                    onChange={(e)=> setTextSize(e.target.value)} // Update the state on change
                  />
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Language</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={()=> setLanguage('javascript')}>JavaScript</MenubarItem>
              <MenubarItem onClick={()=> setLanguage('python')}>Python</MenubarItem>
              <MenubarItem onClick={()=> setLanguage('javascript')}>JSX</MenubarItem>
              <MenubarItem onClick={()=> setLanguage('css')}>CSS</MenubarItem>
              <MenubarItem onClick={()=> setLanguage('html')}>html</MenubarItem>
              <MenubarItem onClick={()=> setLanguage('cpp')}>C++</MenubarItem>
              <MenubarItem onClick={()=> setLanguage('C')}>C</MenubarItem>
              <MenubarItem onClick={()=> setLanguage('csharp')}>C#</MenubarItem>
              <MenubarItem onClick={()=> setLanguage('jsx')}>TSX</MenubarItem>
              <MenubarItem onClick={()=> setLanguage('typescript')}>TypeScript</MenubarItem>
              <MenubarItem onClick={()=> setLanguage('php')}>php</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

        </Menubar>
      </div>

      <div className="absolute left-[50%]" style={{ transform: "translate(-50%, 0)" }}>
        <Button className="bg-green-500 hover:bg-green-600">
          <Play className="w-5 fill-black" />Run
        </Button>
      </div>

      <div>
        <img src={user.image || "https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg"} className="w-8 h-8 rounded-full" />
      </div>
    </nav>
  );
};

export default EditorNav;
