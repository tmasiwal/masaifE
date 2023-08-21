

const express=require('express')
const {connectionn}=require("./db")
const {userRouter}=require("./Route/userRoute")
const cors=require("cors")
const {postRoute}=require("./Route/postRoute")
const app = express();
app.use(cors())
app.use(express.json());

app.use("/users",userRouter)
app.use("/posts",postRoute)

app.listen(4500, async()=>{
    try{
        await connectionn
        console.log("connected to db")
        console.log("port is running at http://localhost:4500")
    }
    catch(err){
console.log(err)
    }
})