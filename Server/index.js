const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const {MongoDb} = require('./Database'); 
dotenv.config();

const app = express();




//importing routes 


// middlewares 
app.use(cors());
app.use(express.json());

MongoDb();

const userRoute = require("./Routes/userRoute")
const courseRoute = require("./Routes/courseRoute")
const sectionRoute = require("./Routes/sectionRoute")
app.use("/user", userRoute)
app.use("/course", courseRoute)
app.use("/section", sectionRoute)
// app.use(errorMiddleWare);








app.listen(process.env.PORT||3000, () => {
    console.log(`backend started at ${process.env.PORT}`)

})