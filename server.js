require('dotenv').config({path: './config/key.env'})
const express = require('express')
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')




const app = express()
const cors = require("cors");
app.use(cors())


app.use(bodyParser.json());

app.use(cookieParser())
const MyDB = require('./db')
const routes = require('./routes/api/member')
const routesactivity = require('./routes/api/activity')
const routesauth = require('./routes/api/auth')




//  app.use(["/api/activity/member/exercise_activity","/api/activity/member/exercise_activity","/api/member/exercise_activities/display","/api/member/exercise_activity/delete/:id","/api/member/edit_exercise_activity/:id", Auth])
MyDB.main();

app.get("/uploads/:id",(req,res)=>{
    res.sendFile(require("path").join(__dirname,"uploads",req.params.id))
})

app.use('/api/member', routes);
app.use('/api/activity', routesactivity);
app.use('/api/auth', routesauth);




app.get("/",(req,res) =>{
    console.log(req.cookies)
    console.log(req.headers["cookie"])
    res.send("Allowed")
})




// app.use(cors({origin:"*",}))





const PORT = 8000
app.listen(PORT, console.log(`server running in`));



