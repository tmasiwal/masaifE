

const express = require('express')
const {UserModel,BlacklistModel}=require("../model/userModel")
const bcrypt = require('bcrypt');
const jwt= require("jsonwebtoken")

const userRouter=express.Router();




userRouter.post("/register",async(req,res)=>{

    try{
const {email} = req.body
console.log(email)
const user= await UserModel.findOne({email})
console.log(user)
if(user){
    res.status(200).json({"msg":"User already exist, please login"})
}

else{    const {name,email,password,age,city,is_married} = req.body
    console.log(password)
    bcrypt.hash(password, 5, async(err, hash)=>{
  
      if(err){
        res.json({"msg":err.message})
      }
      else{
        const newUser= new UserModel({name,email,password:hash,age,city,is_married})
        await newUser.save();
        res.status(200).json({"msg":"user registered successfully"})
      }
    });
}




    }
    catch(err){
        console.log(err)
    }
    
})


userRouter.post("/login",async(req,res)=>{

    const {email} = req.body

const user= await UserModel.findOne({email})


    if(user){
        var token = jwt.sign({ userID:user._id }, 'masai',{expiresIn:"7d"});
        res.status(200).json({"msg":"success login",token})
    }

    else{
        res.status(400).json({"msg":"invalid token"})
    }
})

userRouter.get("/logout",async(req,res)=>{
    const token= req.headers.authorization
    const newToken= new BlacklistModel({token})
    await newToken.save()
    res.status(200).json({"msg":"success logout"})
})

module.exports={userRouter}