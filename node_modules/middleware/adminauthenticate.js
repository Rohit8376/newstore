const jwt = require('jsonwebtoken')

const Admin = require('../Model/Admin')

const adminauthenticate = async (req,res,next)=>{

    try{

      const token = req.cookies.AdminjwtToken; 
      const verifyToken = jwt.verify(
        token,
        "mynameisrohitkumarpandeywebdeveloper"
      );
      
      const RootAdmin = await Admin.findOne({
        _id: verifyToken._id,
        "tokens.token": token,
      });

      if(!RootAdmin){ throw new Error("Login first to perform this this operation");}

      req.token = token;
       
      next()

    }catch(err){
        res.status(400).send({'unauthorize':'Login first to perform this this operation'})
        console.log(err)
    }
};

module.exports = adminauthenticate;