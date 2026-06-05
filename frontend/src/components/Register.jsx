import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../authContext';

const Register = () => {
  const [formData, setFormData] = useState({
    UserName: '',
    Password: '',
    Password2: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const { UserName, Password, Password2 } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (Password !== Password2) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
        {
          UserName,
          Password,
        }
      );

      const success = await loginUser(res.data.token);
      if (success) navigate('/login');
      else setError('Registration successful but failed to log in automatically.');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-200'>
      <div className='p-4 w-md bg-gray-50 shadow-lg rounded-lg'>
        <h2 className='font-bold text-2xl p-2'>Register</h2>
        {error && <p className='text-red-500 font-medium'>{error}</p>}

        <form onSubmit={onSubmit}>
          <div>
            <label className='block font-medium mt-2' htmlFor='UserName'>UserName</label>
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
            <label className='block font-medium mt-2' htmlFor='Password'>Password:</label>
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

          <div>
            <label className='block font-medium mt-2' htmlFor='Password2'>Confirm Password:</label>
            <input
              type='password'
              placeholder='Confirm Password'
              name='Password2'
              value={Password2}
              onChange={onChange}
              minLength='6'
              required
              className="w-full p-2 outline-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            />
          </div>

          <button
            type='submit'
            className='w-full mt-2 bg-green-500 p-2 text-white font-medium hover:bg-green-600 cursor-pointer rounded'
          >
            Register
          </button>

          <div className='w-full text-md font-thin text-blue-500'>
            already have an account Please{' '}
            <Link className='hover:underline font-medium' to='/login'>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

