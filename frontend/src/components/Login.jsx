import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';

// expects VITE_API_BASE_URL in frontend/.env


const Login = () => {
  const [formData, setFormData] = useState({
    UserName: '',
    Password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const { UserName, Password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        { UserName, Password }
      );

      const success = await loginUser(res.data.token);
      if (success) navigate('/');
      else setError('Login successful but failed to fetch user data.');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-200'>
      <div className='w-md bg-gray-50 shadow-lg p-4 rounded-lg'>
        <h2 className='font-bold text-2xl'>Login</h2>
        {error && <p className='text-red-500 font-medium'>{error}</p>}

        <form onSubmit={onSubmit}>
          <div>
            <label className='block mt-2 font-medium' htmlFor='UserName'>UserName:</label>
            <input
              type='text'
              placeholder='UserName'
              name='UserName'
              value={UserName}
              onChange={onChange}
              required
              className="w-full p-2 outline-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            />
          </div>

          <div>
            <label className='block mt-2 font-medium' htmlFor='Password'>Password:</label>
            <input
              type='password'
              placeholder='Password'
              name='Password'
              value={Password}
              onChange={onChange}
              minLength='6'
              required
              className="w-full p-2 outline-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            />
          </div>

          <button
            type='submit'
            className='w-full mt-2 bg-blue-500 p-2 text-white font-medium hover:bg-blue-600 cursor-pointer rounded'
          >
            Login
          </button>

          <div className='w-full text-md font-thin text-blue-500'>
            if no account Please <Link className='hover:underline font-medium' to='/register'>register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

