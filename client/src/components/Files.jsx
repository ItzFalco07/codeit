import React from 'react';
import FolderTree from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';
import { useStructure } from '../context/structure';
import jsIcon from '/javascript.svg'; // Replace with your correct path
import pyIcon from '/python.svg';
import ts from '/ts.svg';
import html from '/html.svg';
import file from '/file.svg';
import json from '/json.svg';
import cpp from '/cpp.svg';
import png from '/png.svg';
import css from '/css.svg';
import svg from '/svg.svg';
import axios from 'axios';
import { useCode } from '../context/code'

const Files = ({setLanguage, setPath}) => {
  const { Structure } = useStructure();
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const {setCode} = useCode()


  function getLanguage(name) {
    if(name.endsWith('.js')) return 'javascript';
    if(name.endsWith('.py')) return 'python';
    if(name.endsWith('.json')) return 'json';
    if(name.endsWith('.cpp')) return 'cpp';
    if(name.endsWith('.html')) return 'html';
    if(name.endsWith('.svg')) return 'xml'; // SVG is typically XML-based
    if(name.endsWith('.css')) return 'css';
    if(name.endsWith('.c')) return 'c';
    if(name.endsWith('.ts')) return 'typescript';
    if(name.endsWith('.jsx')) return 'javascriptreact';
    if(name.endsWith('.tsx')) return 'typescriptreact';
    if(name.endsWith('.scss')) return 'scss';
    if(name.endsWith('.less')) return 'less';
    if(name.endsWith('.md')) return 'markdown';
    if(name.endsWith('.go')) return 'go';
    if(name.endsWith('.java')) return 'java';
    if(name.endsWith('.rb')) return 'ruby';
    if(name.endsWith('.php')) return 'php';
    if(name.endsWith('.cs')) return 'csharp';
    if(name.endsWith('.sql')) return 'sql';
    if(name.endsWith('.rs')) return 'rust';
    if(name.endsWith('.swift')) return 'swift';
    if(name.endsWith('.kt')) return 'kotlin';
    if(name.endsWith('.dart')) return 'dart';
    if(name.endsWith('.lua')) return 'lua';
    if(name.endsWith('.bash')) return 'shell';
    if(name.endsWith('.vhdl')) return 'vhdl';
    if(name.endsWith('.haskell')) return 'haskell';
    if(name.endsWith('.elm')) return 'elm';
    if(name.endsWith('.scala')) return 'scala';
    if(name.endsWith('.perl')) return 'perl';
    if(name.endsWith('.xml')) return 'xml';
    if(name.endsWith('.yaml')) return 'yaml';
    if(name.endsWith('.txt')) return 'plaintext';  // For text files

    return 'plaintext';  // Default fallback
  }


  // Function to handle file clicks
  const handleFileClick = async ({ defaultOnClick, nodeData }) => {
    console.log('file clicked with data', nodeData)
    defaultOnClick();  // Default click behavior (expand/collapse)
    const { fullpath, name } = nodeData;  // `_id` should contain the full path here

    setPath(fullpath);

    const language = getLanguage(name)
    setLanguage(language)
    
    
    console.log('path', fullpath); 

    const res = await axios.post(`${backendUrl}/getcode`, {path: fullpath})
    if(res.data) {
      setCode(res.data);
      console.log('code', res.data);
    } else {
      setCode('')
    }
  };

  // Custom function to render file icons based on file extension
  const FileIcon = ({ nodeData }) => {
    const { name } = nodeData;

    const getFileIcon = () => {
      if (name.endsWith('.js')) return jsIcon;
      if (name.endsWith('.py')) return pyIcon;
      if (name.endsWith('.json')) return json;
      if (name.endsWith('.html')) return html;
      if (name.endsWith('.ts')) return ts;
      if (name.endsWith('.css')) return css;
      if (name.endsWith('.cpp')) return cpp;
      if (name.endsWith('.png')) return png;
      if (name.endsWith('.svg')) return svg;

      return file; // Default file icon
    };

    return <img src={getFileIcon()} alt={name} style={{ width: '18px', height: '18px', marginRight: '4px' }} />;
  };

  return (
    <div className="px-4 pt-2 relative h-full overflow-y-scroll">
      <FolderTree
        data={Structure}
        showCheckbox={false}
        iconComponents={{
          FileIcon, // Override the FileIcon
        }}
        onNameClick={handleFileClick}
      />
    </div>
  );
};

export default Files;
