const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const developerSchema = new mongoose.Schema({

  name: { type: String,    required: true },
  email: { type: String,   required: true },
  password: { type: String,required:true }, 

  profile:{
    type:String,
    default:null, 
  },

  tokens: [
    {
      token: { type: String, required: true },
    },
  ],

  Feadbacks: [
    {
      feadback: { type: String, required: true },
    },
  ]

});


// we generating jwt auth token


developerSchema.methods.generateAuthToken = async function(){
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

developerSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);    
    }
    next();
})  


const Developer = mongoose.model("USER", developerSchema);

module.exports = Developer;