const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const AdminSchema = new mongoose.Schema({

  name: { type: String,    required: true },
  email: { type: String,   required: true },
  password: { type: String,required:true }, 

  profile:{
    type:String,
    default:null
  },

  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
 

});


// we generating jwt auth token


AdminSchema.methods.generateAuthToken = async function(){
  try{
    const SECRET_KEY = "mynameisrohitkumarpandeywebdeveloper";
    let token = await jwt.sign({_id:this._id}, SECRET_KEY); 
    this.tokens = this.tokens.concat({token:token})
    await this.save();
    return token;
  
   }catch(err){ 
    console.log(err)
  }

}

//  we are  hashing the password hare

AdminSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);    
    }
    next();
})  


const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;