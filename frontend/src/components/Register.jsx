import React, { useState } from 'react';  
import axios from 'axios';  
import { useNavigate, Link } from 'react-router-dom';  
import { useAuth } from '../App'; // Import useAuth hook to use setAuthToken  
const Register = () => {  
const [formData, setFormData] = useState({  
username: '',  
email: '',  
password: '',  
password2: ''  
});  
const [error, setError] = useState(null);  
const navigate = useNavigate();  
const { loginUser } = useAuth(); // Get loginUser function from context  
const { username, email, password, password2 } = formData;  
const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });  
  const onSubmit = async e => {  
    e.preventDefault();  
    if (password !== password2) {  
      setError('Passwords do not match');  
      return;  
    }  
  
try {  
const res = await axios.post('http://localhost:7000/api/auth/register', {  
username,  
email,  
password  
});  
console.log('Registration successful:', res.data);  
// Log in the user immediately after successful registration  
const success = await loginUser(res.data.token);  
if (success) {  
navigate('/login'); // Redirect to dashboard  
} else {  
setError('Registration successful but failed to log in automatically.');  
}  
} catch (err) {  
console.error('Registration error:', err.response ? err.response.data : err.message);  
setError(err.response ? err.response.data.msg || 'Registration failed' : 'Registration failed');  
}  
};  
return (  
<div className='min-h-screen flex justify-center items-center bg-gray-200'>
<div className='p-4 w-md bg-gray-50 shadow-lg rounded-lg'>      
<h2 className='font-bold text-2xl p-2'>Register</h2>  
{error && <p className='text-red-500 font-medium'>{error}</p>}  
<form onSubmit={e => onSubmit(e)}>  
<div>  
<label className='block font-medium mt-2' htmlFor="username">Username</label>  
<input type="text" placeholder="Username" name="username" value={username}  
onChange={e => onChange(e)}  
required
className="w-full p-2 outline-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded" 
/>  
</div>  
<div>  
<label className='block font-medium mt-2' htmlFor="email">Email</label>  
<input  
type="email"  
placeholder="Email Address"  
name="email"  
value={email}  
onChange={e => onChange(e)}  
required
className="w-full p-2 outline-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded" 
/>  
</div>  
<div>  
<label className='block font-medium mt-2' htmlFor="password">Password:</label>  
<input  
type="password"  
placeholder="Password"  
name="password"  
value={password}  
onChange={e => onChange(e)}  
minLength="6"  
required
className="w-full p-2 outline-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"  
/>  
</div>  
<div>  
<label className='block font-medium mt-2' htmlFor="password2">Confirm Password:</label>  
<input  
type="password"  
placeholder="Confirm Password"  
name="password2"  
value={password2}  
onChange={e => onChange(e)}  
minLength="6"  
required
className="w-full p-2 outline-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"  
/>  
</div>  
<button type="submit" className='w-full mt-2 bg-green-500 p-2 text-white font-medium hover:bg-green-600 cursor-pointer rounded'>Register</button>  
<div className='w-full text-md font-thin text-blue-500'> 
already have an account Please <Link className='hover:underline font-medium' to="/login">Login</Link> 
</div>          
</form>  
</div>
</div>  
)}  

export default Register;  