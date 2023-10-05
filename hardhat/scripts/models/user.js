const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({
  sender :{
      type  : String,
      required : true
  } ,

  receiver :{
    type  : String,
    required : true
} ,
amount :{
    type  : String,
    required : true
} 
});
const User= mongoose.model('User',UserSchema);

module.exports = User;