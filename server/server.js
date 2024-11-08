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

app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_KEY],
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: process.env.TYPE === 'production', // Only use secure cookies in production
    sameSite: 'none', // Required for cross-origin requests in modern browsers
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://codeit69.vercel.app"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use('/api', routes)
app.use("/auth", authRoute);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('connected')
  } catch(error) {
    console.error(error)
  }
}
connectDB()

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));