const jwt = require('jsonwebtoken')

const Developer = require('../Model/Developer')

const authenticate = async (req,res,next)=>{

    try{

      // const token = req.cookies.jwtToken; 

      const token = req.headers.authorization.split(" ")[1]; 

      if(!token) return res.send("token must be provided..");

      // const token = req.body.token; 

      const verifyToken = jwt.verify(
        token,
        "mynameisrohitkumarpandeywebdeveloper"
      );
      
      const RootDeveloper = await Developer.findOne({
        _id: verifyToken._id, 
      });

      if(!RootDeveloper){ throw new Error("Login first to perform this this operation");}

      req.token = token;
      req.id = verifyToken._id; 
       
      next()

    }catch(err){
        res.status(401).send({'unauthorize':'Login first to perform this this operation'})
        console.log(err)
    }
};

module.exports = authenticate;