import React, { useState } from 'react';  
import axios from 'axios';  
import { Link, useNavigate } from 'react-router-dom';  
import { useAuth } from '../App'; // Import useAuth hook  
  
const Login = () => {  
const [formData, setFormData] = useState({  
email: '',  
password: ''  
});  
const [error, setError] = useState(null);  
const navigate = useNavigate();  
const { loginUser } = useAuth(); // Get loginUser function from context  
const { email, password } = formData;  
const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });  
const onSubmit = async e => {  
e.preventDefault();  
try {  
const res = await axios.post('http://localhost:7000/api/auth/login', {  
email,  
password  
});  
console.log('Login successful:', res.data);  
const success = await loginUser(res.data.token);  
if (success) {  
navigate('/'); // Redirect to home page 
} else {  
setError('Login successful but failed to fetch user data.');  
}  
} catch (err) {  
console.error('Login error:', err.response ? err.response.data : err.message);  
setError(err.response ? err.response.data.msg || 'Login failed' : 'Login failed');  
}  
};  
return (  
<div className='min-h-screen flex justify-center items-center bg-gray-200'> 
<div className='w-md bg-gray-50 shadow-lg p-4 rounded-lg'>     
<h2 className='font-bold text-2xl'>Login</h2>  
{error && <p className='text-red-500 font-medium'>{error}</p>}  
<form onSubmit={e => onSubmit(e)}>  
<div>  
<label className='block mt-2 font-medium' htmlFor="email">Email:</label>  
<input type="email" placeholder="Email Address" name="email"  
value={email} onChange={e => onChange(e)} required
className="w-full p-2 outline-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"  
/>  
</div>  
<div>  
<label className='block mt-2 font-medium' htmlFor="password">Password:</label>  
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
<button type="submit" className='w-full mt-2 bg-blue-500 p-2 text-white font-medium hover:bg-blue-600 cursor-pointer rounded'>Login</button> 
<div className='w-full text-md font-thin text-blue-500'> 
if no account Please <Link className='hover:underline font-medium' to="/register">register</Link> 
</div>  
</form>  
</div> 
</div>
)
  } 
  
  
export default Login; 