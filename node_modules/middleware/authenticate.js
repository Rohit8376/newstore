const jwt = require('jsonwebtoken')

const Developer = require('../Model/Developer')

const authenticate = async (req,res,next)=>{

    try{

      const token = req.cookies.jwtToken; 
      const verifyToken = jwt.verify(
        token,
        "mynameisrohitkumarpandeywebdeveloper"
      );
      
      const RootDeveloper = await Developer.findOne({
        _id: verifyToken._id,
        "tokens.token": token,
      });

      if(!RootDeveloper){ throw new Error("Login first to perform this this operation");}

      req.token = token;
      req.id = verifyToken._id; 
       
      next()

    }catch(err){
        res.status(400).send({'unauthorize':'Login first to perform this this operation'})
        console.log(err)
    }
};

module.exports = authenticate;