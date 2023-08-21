/*
name ==> String
email ==> String
gender ==> String
password ==> String
age ==> Number
city ==> String
is_married ==> boolean
*/

const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number,
    city:String,
    is_married:Boolean
},{
    versionKey:false
})

const UserModel=mongoose.model("users",userSchema)

//blacklist

const blacklistSchema=mongoose.Schema({
    token:String,
})
const BlacklistModel=mongoose.model("blacklists",blacklistSchema)

module.exports = {UserModel,BlacklistModel}
