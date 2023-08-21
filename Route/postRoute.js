

const express=require('express');
const {auth}=require("../middleware/auth")
const {PostModel}=require("../model/postModel")

const postRoute= express.Router();


postRoute.post("/add",auth,async(req,res)=>{

    const post=new PostModel(req.body)

    await post.save();
    res.status(200).json({"msg":"successfully added"})

})

postRoute.patch("/update/:id",auth,async(req,res)=>{

    const {id}=req.params;
    const post = await PostModel.findOne({_id:id})

    try{
        if(req.body.userID!==post.userID){
            res.status(400).json({"msg":" yor are not authorized"})
        }
        else{
            await PostModel.findByIdAndUpdate(id,req.body)

            res.send({"msg":"post updated successfully"})
        }
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
})


postRoute.delete("/delete/:id",auth,async(req,res)=>{

    const {id}=req.params;
    const post = await PostModel.findOne({_id:id})

    try{
        if(req.body.userID!==post.userID){
            res.status(400).json({"msg":" yor are not authorized"})
        }
        else{
            await PostModel.findByIdAndDelete(id)

            res.send({"msg":"post deleted successfully"})
        }
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
})

postRoute.get("/",auth,async(req, res)=>{
    const page=parseInt(req.query.page)||1
    const post= await PostModel.find({userID:req.body.userID}).skip((page-1)*3).limit(3).exec();
    if(post){
        res.status(200).json({"msg":"success",post})
    }
    else{
        res.status(404).json({"msg":err.message})
    }
})


postRoute.get("/top",auth,async(req, res)=>{
    const page=parseInt(req.query.page)||1

    const post= await PostModel.find({userID:req.body.userID}).sort({no_of_comments:-1}).skip((page-1)*3).limit(3).exec();
    if(post){
        res.status(200).json({"msg":"success",post})
    }
    else{
        res.status(404).json({"msg":err.message})
    }
})



module.exports={postRoute}


