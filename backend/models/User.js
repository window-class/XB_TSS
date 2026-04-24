import mongoose from "mongoose";  
const userSchema = new mongoose.Schema({  
username: {  
type: String,  
required: true,  
    unique: true,  
    trim: true,  
  },  
  email: {  
    type: String,  
    required: true,  
    unique: true,  
    trim: true,  
    lowercase: true,  
    match: [/.+@.+\..+/, 'Please enter a valid email address'], // Email regular expression validation  
  },  
  password: {  
    type: String,  
    required: true,  
    minlength: 6, // Enforce minimum password length to not less than 6 characters  
  },  
  createdAt: {  
    type: Date,  
    default: Date.now,  
  },  
});  
  
const User = mongoose.model('User', userSchema); 
export default User;