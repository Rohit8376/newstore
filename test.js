const nodemailer = require("nodemailer");


function sendMails(){

    
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "1080pandey@gmail.com",
      pass: "Kapilpandey",
    },
  });


var mailOptions = {
  from: "ccccccccccccccccccccc@gmail.com",
  to: "rohit.kp.pandey@gmail.com",
  subject: "Registerd as developer",
  html: `<h2>  Congrats You are part of our Development Team </h2>
         <h4>please find here is your credentials for sign in</h4>
         <p>username : rohit.kp.pandey@gmail.com <br/> password : rohit@123</p>
  `,
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);          
    res.redirect("back");
  }
});


}
sendMails()






// async function main() {
  
//   try{
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, 
//     auth: {
//       user: "1080pandey@gmail.com",
//       pass: "Kapilpandey",
//     },
//   });


//   let info = await transporter.sendMail({

//     from: '1080pandey@gmail.com', 
//     to: "Rohit.kp.pandey@gmail.com",
//     subject: "Hello ✔", 
//     text: "Hello world?", 
//     html: "<b>Hello world?</b>", 

//   });

//   console.log("Message sent: %s", info.messageId);
// }catch(e){
//   console.log("error"+e)
// }
 
// }


// main().catch(console.error);



