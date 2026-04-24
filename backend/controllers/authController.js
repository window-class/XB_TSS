import User from '../models/User.js'; 
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 
  
 
 const register = async (req, res) => {  
  const { username, email, password } = req.body;  
  
  try {  
    // Check if user already exists  
    let user = await User.findOne({ email });  
    if (user) {  
      return res.status(400).json({ msg: 'User already exists' });  
}  
// Create new user instance  
user = new User({  
username,  
email,  
password,  
});  
// Hash password  
const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds  
user.password = await bcrypt.hash(password, salt); // Hash the password  
// Save user to database  
await user.save();  
// Create and sign JWT  
const payload = {  
user: {  
id: user.id, // MongoDB's _id is exposed as 'id' by Mongoose  
},  
};  
jwt.sign(  
payload,  
process.env.JWT_SECRET,  
{ expiresIn: '1h' }, // Token expires in 1 hour  
(err, token) => {  
if (err) throw err;  
res.status(201).json({ token, msg: 'User registered successfully!' });  
}  
);  
} catch (err) {  
console.error(err.message);  
res.status(500).send('Server Error');  
}  
};  
 
const login = async (req, res) => {  
const { email, password } = req.body;  
try {  
// Check if user exists  
let user = await User.findOne({ email });  
if (!user) {  
return res.status(400).json({ msg: 'Invalid credentials' });  
}  
// Compare provided password with hashed password  
const isMatch = await bcrypt.compare(password, user.password);  
if (!isMatch) {  
return res.status(400).json({ msg: 'Invalid credentials' });  
}  
// Create and sign JWT  
const payload = {  
user: {  
id: user.id,  
},  
};  
jwt.sign(  
payload,  
process.env.JWT_SECRET,  
{ expiresIn: '1h' },  
(err, token) => {  
if (err) throw err;  
res.json({ token, msg: 'Logged in successfully!' });  
}  
);  
} catch (err) {  
console.error(err.message);  
res.status(500).send('Server Error');  
}  
}; 

 const getAuthenticatedUser = async (req, res) => {  
  try {  
 
    const user = await User.findById(req.user.id).select('-password'); // Exclude password  
    res.json(user);  
  } catch (err) {  
    console.error(err.message);  
    res.status(500).send('Server Error');  
  }  
}; 
 
export default {register, login, getAuthenticatedUser};


