const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const userRoutes=require("./routes/userRoutes");
const appointmentRoutes=require("./routes/appointmentRoutes")
const bookRoutes=require("./routes/bookRoutes");
const allowedOrigins = [
  '*',
];


app.use(cors({ origin: 'http://localhost:3000' }));


// app.use(cors({
//   origin: allowedOrigins ,credentials:true// Add your ngrok URL here
// }));
app.get("/",(req,res)=>{
    res.send("Hello world");
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/user",userRoutes);
app.use("/api/appointments",appointmentRoutes);
app.use("/api/books",bookRoutes);
const PORT = 9999;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

console.log(process.env.MONGOOSE_URL)
mongoose.connect(process.env.MONGOOSE_URL)

mongoose.connection.on("error", function (error) {
  console.log("Error connecting to the database:", error);
});