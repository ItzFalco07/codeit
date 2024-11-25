import React, {useState, useEffect} from 'react';
import CodeEditor from '@/components/CodeEditor'
import {Home} from 'lucide-react'
import EditorNav from '@/components/EditorNav';
import { useUser } from '../context/user'
import Console from "@/components/Console";
import Files from '@/components/Files'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import RightTabs from '../components/RightTabs'
import Ai from '@/components/Ai'

const Editor = () => {
  const [Code, setCode] = useState('// start writing your code here')
  const [theme, setTheme] = useState('vs-dark');
  const [filesSize, setfilesSize] = useState(220)
  const [textSize, setTextSize] = useState(16); // Local text size state for input
  const [Language, setLanguage] = useState('javascript');
  const [Path, setPath] = useState(null);
  const [Selected, setSelected] = useState('console')

	function handleCodeChange(newcode) {
		setCode(newcode)
	}
  useEffect(()=> {console.log(filesSize)}, [filesSize])

	return (
	<div className="relative w-full h-screen overflow-scroll">
    	<EditorNav setTheme={setTheme} setfilesSize={setfilesSize} setTextSize={setTextSize} textSize={textSize} setLanguage={setLanguage}/>
      <ResizablePanelGroup direction="horizontal" className="relative max-h-[93%] flex gap-1">
    		<ResizablePanel defaultSize={filesSize} className="relative h-[100%]">
          <Files setPath={setPath} setLanguage={setLanguage} />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={600}>
          <CodeEditor Path={Path} Language={Language} textSize={textSize} theme={theme} value={Code} onChange={setCode} />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize = {300} className="relative h-[93vh]">
          <RightTabs setSelected={setSelected} Selected = {Selected}/>
          {(Selected === 'console') ? <Console/> : <Ai/>}
        </ResizablePanel>
      </ResizablePanelGroup>
	</div>
	)
};

export default Editor;