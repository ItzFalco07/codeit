import React, {useState, useEffect} from 'react';
import CodeEditor from '@/components/CodeEditor'
import {Home} from 'lucide-react'
import EditorNav from '@/components/EditorNav';
import { useUser } from '../context'
import Console from "@/components/Console";
import Files from '@/components/Files'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

const Editor = () => {
    const [Code, setCode] = useState('// start writing your code here')
  const [theme, setTheme] = useState('vs-dark');
  const [filesSize, setfilesSize] = useState(220)
  const [textSize, setTextSize] = useState(16); // Local text size state for input
  const [Language, setLanguage] = useState('javascript');


	function handleCodeChange(newcode) {
		setCode(newcode)
	}
  useEffect(()=> {console.log(filesSize)}, [filesSize])

	return (
	<>
	<EditorNav setTheme={setTheme} setfilesSize={setfilesSize} setTextSize={setTextSize} textSize={textSize} setLanguage={setLanguage}/>
      <ResizablePanelGroup direction="horizontal" className="min-h-[93vh] flex">
		<ResizablePanel defaultSize={filesSize}>
          <Files />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={600}>
          <CodeEditor Language={Language} textSize={textSize} theme={theme} value={Code} onChange={setCode} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={300}>
          <Console />
        </ResizablePanel>
      </ResizablePanelGroup>
	</>
	)
};

export default Editor;