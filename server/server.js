require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./modules/authRoutes");
const cookieSession = require("cookie-session");
const passportStrategy = require("./modules/passport");
const app = express();
const routes = require("./modules/routes")
const mongoose = require("mongoose")
const folder = require("./modules/folder")
const { spawn } = require('node-pty');

const http = require('http');
const socket = require('socket.io');
const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: ["http://localhost:5173", "https://codeit69.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true
  }
});
app.use(express.json());

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_KEY],
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: process.env.TYPE === 'production',  // Only use secure cookies in production
    sameSite: process.env.TYPE === 'production' ? 'none' : 'lax'  // Allows cross-site cookies
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://codeit69.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);


app.use('/',folder);
app.use('/api', routes)
app.use("/auth", authRoute);

io.on('connection', (socket) => {
  console.log('socket connected');
  let ptyProcess = null; // Single PTY per socket

  socket.on('path', (path) => {
    if (ptyProcess) {
      console.log('Killing existing PTY for new path');
      ptyProcess.kill(); // Kill any existing PTY process
    }

    const shell = process.platform === 'win32' ? 'cmd.exe' : 'bash';
    ptyProcess = spawn(shell, [], {
      name: 'xterm-color',
      cols: 100,
      rows: 200,
      cwd: path,
      env: process.env,
    });

    let commandInstance = '';

    ptyProcess.on('data', (data) => {
      if (data.trim() === commandInstance.trim()) {
        commandInstance = '';
        return;
      }
      socket.emit('terminal-output', data);
    });

    ptyProcess.on('error', (err) => {
      console.log('PTY Error:', err);
      socket.emit('terminal-output', `Error: ${err.message}`);
    });

    ptyProcess.on('exit', (code, signal) => {
      console.log('PTY exited:', code, signal);
      ptyProcess = null; // Ensure we clear the reference
    });

    socket.on('command', (command) => {
      commandInstance = command;
      if (ptyProcess) ptyProcess.write(command + '\r');
    });
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected');
    if (ptyProcess) {
      ptyProcess.kill();
      ptyProcess = null; // Clear reference after kill
    }
  });
});



async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('mongo connected')
  } catch(error) {
    console.error(error)
  }
}
connectDB()

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Listenting on port ${port}...`));