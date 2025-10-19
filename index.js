const express = require("express")
const connectDB = require("./config/db.js")
const userRoutes = require("./routes/user.routes.js")
const reportRoutes = require("./routes/report.routes.js")
const cors = require("cors")
const path = require('path');

connectDB()
const app = express()
const PORT = 5000 || process.env.PORT
app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://final-hackathon-one-beta.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // if you’re using cookies or tokens
  })
);

// ✅ Handle preflight requests explicitly
app.options('*', cors());

app.use("/", userRoutes)

app.use("/reports", reportRoutes);

app.listen(PORT, () => {
    console.log("Server is listening~!")
})