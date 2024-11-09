import Editor from '@monaco-editor/react'

const editorOptions = {
	fontSize: 16
}

const CodeEditor = () => { 
  return (
  	<>
  	<Editor 
  	 height = "100vh"
  	 theme = "vs-dark"
  	 language = {"javascript"}
  	 options = {editorOptions}
  	 defaultValue="//start writing code here - made by falco"
  	/>
  	</>
  )
};

export default CodeEditor;
