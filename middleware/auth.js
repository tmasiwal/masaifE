

const jwt= require("jsonwebtoken")


const auth=(req,res,next)=>{
    const token= req.headers.authorization

    var decoded = jwt.verify(token, 'masai');
if(decoded){
    req.body.userID=decoded.userID
    next();
}

else{
    res.send({"mag":"login again"})
}
}



module.exports={auth}