const express = require("express"); 
const multer = require('multer')
var os = require("os"); 
const authenticate = require('../middleware/authenticate')
const adminauthenticate = require('../middleware/adminauthenticate')
const Developer = require("../Model/Developer"); 
const Admin = require("../Model/Admin")
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs')
const router = express.Router();

  
const storage  = multer.diskStorage({
  destination:function(req,file,cb){
    console.log(file)
    cb(null, './profiles/')
  },

  filename :function(req,file,cb){
   console.log(file)
    cb(null, file.originalname)
  }

})

const fileFilter = function(req,file,cb){

  console.log(file.mimetype)
  if(file.mimetype=='image/jpeg' || file.mimetype=='image/png'){
    cb(null, true)
   
  }else{
    cb(null, false)
  }
  
}
 
const upload = multer({ storage:storage, limits:{
  fileSize:1024*1024*5 // number in bytes which is 5 mb
},
fileFilter:fileFilter,
});
 

router.post("/DeveloperSignin" , async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
 
    if (!email || !password) {
      return res.status(400).json({ error: "plz filled the field" });
    }

    const UserLogin = await Developer.findOne({ email: email });

    if (UserLogin) {
      const isMatch = await bcrypt.compare(password, UserLogin.password);
      if (isMatch) {

        token = await UserLogin.generateAuthToken();

        // res.cookie("jwtToken", token, {
        //   expires: new Date(Date.now() + 25892000000),
        //   httpOnly: true
        // });

        let {name, email, _id, Feadbacks, profile}  = UserLogin;
        
        res.status(200).json({UserLogin: { _id,name, email, profile, token:token, Feadbacks} });


      } else {
        
        res.status(401).json({ message: "invalid credentials" });
      }
    } else {
         
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
}); 
  
router.post("/register",  upload.single('profileImage') ,async (req, res) => {
 
  const { name, email } = req.body;  

  console.log(name,email)

  if(req.file==undefined){
    return res.send("pls upload correct file")
  }else{
  console.log(req.file)
  try {
     
    if (!name || !email ) {
      return res.status(422).json({ error: "plz filled all the field" });
    }

    const DeveloperExist = await Developer.findOne({ email: email });

    if (DeveloperExist) {
      return res.status(422).json({ error: "email already exist" });
    } 

    var password = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'+'abcdefghijklmnopqrstuvwxyz0123456789@#$'; 
    for (i = 1; i <= 10; i++) {
        var char = Math.floor(Math.random()*str.length + 1); 
        password += str.charAt(char)
    } 


          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "1080pandey@gmail.com",
              pass: "Kapilpandey",
            },
          });
      
          var mailOptions = {
            from: "1080pandey@gmail.com",
            to:email,
            subject: "Registerd as developer",
            html: `<h2>Congrats ${name} You are part of our Development Team </h2>
                  <h4>please find here is your credentials for sign in</h4>
                  <p>username : ${email} <br/> password : ${password}</p>
                `,
          };
      
          let info = await  transporter.sendMail(mailOptions);

          // const path = req.protocol + '://' + req.get('host') + "/" + req.file.path;
           
          const path = "/" + req.file.path; 

          const newdeveloper = new Developer({ name:name, email:email, password:password, profile: path});
          const uploaded =  await newdeveloper.save(); 


          console.log(uploaded)

          res.status(200).json({ message: "you have successfully registered check your email for login credentials"});
  
    
  
  } catch (err) {
    console.log(err);
  } 
}
});

router.post("/GetAllRecievers", authenticate , async (req, res) => { 
  const Developers = await Developer.find({_id:{$ne:req.id}},{
    name:1, email:1, profile :1
  });
  res.status(200).send(Developers); 
});

router.get("/GetAllDevelopers",/* adminauthenticate ,*/ async (req, res) => { 
  const Developers = await Developer.find({});
  res.status(200).send(Developers);

});
 
router.post("/addFeadback", authenticate, async(req, res) => {


  try { 
    
        const {email,feadback} = req.body; 
        const username =  await Developer.findOne({_id:req.id}) 
        const d = new Date();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var findDeveloper = await Developer.findOne({email:email});
        findDeveloper.Feadbacks.push({feadback:feadback,name:username.name,date: d.getDate() + " - "+ months[d.getMonth()]+" - "+ d.getFullYear()})
        findDeveloper = await findDeveloper.save() 
        res.status(200).send(findDeveloper);    

  } catch (err) {
    res.status(401).send("error "+err)
    console.log(err);
  }
});


router.get("/logout", (req, res) => { 
  res.clearCookie("jwtToken",{path:'/'});
  res.clearCookie("AdminjwtToken",{path:'/'});
  res.status(200).send("logout Sucessfull");

}); 












router.get("/registerAdmin",  async (req, res) => {

  try {
 
    var password = 'HotWater@123';
    var email = "rohit.pandey@neosoftmail.com";
    var name = "Rohit Pandey";
    

    const newadmin = new Admin({ name, email, password });
 
     const uploaded =  await newadmin.save(); 
 
     res.status(200).json({ message: "successfully registered",uploaded:uploaded });
    
  } catch (err) {
    console.log(err);
  }
});
  
router.post("/AdminSignin"/*,adminauthenticate8*/, async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "plz filled the field" });
    }

    const AdminLogin = await Admin.findOne({ email: email });

    if (AdminLogin) {
      const isMatch = await bcrypt.compare(password, AdminLogin.password);
      if (isMatch) {

        token = await AdminLogin.generateAuthToken();

        res.cookie("AdminjwtToken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true
        });

        res.status(200).json({AdminLogin:AdminLogin });


      } else {
        
        res.status(400).json({ message: "invalid credentials" });
      }
    } else {
         
      res.status(400).json({ message: "invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
})




router.get("/deleteAll", async(req, res) => {
  
 var response = await Developer.deleteMany({});


 res.send({response:response})

});
 


module.exports = router;
