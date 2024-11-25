import { useEffect, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from 'xterm-addon-fit'; // Import the FitAddon
import '@xterm/xterm/css/xterm.css';
import axios from 'axios';
import { useProject } from '../context/project';
import io from 'socket.io-client';
import {useStructure} from '../context/structure';


const Console = ({projName}) => {
  const {Project} = useProject();
  const {setStructure} = useStructure()
  const projectName = Project.name || 'myproject'; // Set your project name here
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  // socket setup
  useEffect(async () => {
    let socket = io(backendUrl, {
      reconnection: true,          // Enable reconnection
      reconnectionAttempts: 5,     // Number of attempts before giving up (optional)
      reconnectionDelay: 1000,     // Delay between attempts (in ms, optional)
      reconnectionDelayMax: 5000   // Max delay between attempts (optional)
    });

    const terminal = new Terminal({
      disableStdin: false,
      screenKeys: true,
      theme: {
        background: '#0a0a0a',
      }
    });
    
    const fitAddon = new FitAddon(); // Initialize the FitAddon
    terminal.loadAddon(fitAddon); // Load the addon
    let terminalElement = document.getElementById('terminal')
    terminal.open(terminalElement);
    fitAddon.fit();
    terminal.write('\n')

    let command = '';

    let getRes = true

    function setTrueAfter5Secs() {
      setTimeout(()=> {
        getRes = true
      }, [2000])
    }

    socket.on('terminal-output', async (data)=> {
      async function resetStructure() {
        terminal.write(data);
        if(getRes) {
          getRes = false
          setTrueAfter5Secs()
          const res = await axios.post(`${backendUrl}/resetStructure`, {projName: Project.name}, {withCredentials: true});
          if(res.data.structure) {
            setStructure(res.data.structure);
          }
        }
      }
      resetStructure()
    })

    let wrote = 0;

    socket.emit('path', Project.path)

    // Handle user input
    terminal.onData((data) => {
      if (data === '\r') {
        terminal.write('\r\n');
      
        if (command.trim() === 'clear') {
          terminal.reset();  // Clear the terminal screen and reset
          command = '';      // Reset the current command
          socket.emit('command', command);
          
        } else {
          socket.emit('command', command);
        }
        wrote = 0
        command = ''
      } else if (data === '\x08' || data === '\x7f') {
        if(wrote > 0) {
          terminal.write('\b \b');
          command = command.slice(0, -1); // gives 0 to last - 1 digit
          wrote--
        }
      } else if (data === '\x03') {
        socket.emit('command', '\x03');  // Send the Ctrl+C signal to backend
      } else {
        // Write the character typed by the user
        terminal.write(data);
        command += data;
        wrote++
      }
    });

    return () => {
      terminal.dispose();
      connection.disconnect();
    };
  }, []);

  return (
    <div id="terminal" className="relative h-[93vh] w-full"></div>
  );
};

export default Console;
