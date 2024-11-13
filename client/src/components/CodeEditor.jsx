import Editor from '@monaco-editor/react'



const CodeEditor = ({theme, textSize, Language}) => { 
  let editorOptions = {
    fontSize: textSize
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Editor
        height="100%"
        width="100%"
        theme={theme}
        language={Language}
        options={editorOptions}
        defaultValue="//start writing code here - made by falco"
      />
    </div>
  )
};

export default CodeEditor;
