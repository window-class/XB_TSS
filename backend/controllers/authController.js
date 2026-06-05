import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  const { UserName, Password } = req.body;

  try {
    let user = await User.findOne({ UserName });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      UserName,
      Password,
    });

    const salt = await bcrypt.genSalt(10);
    user.Password = await bcrypt.hash(Password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.status(201).json({ token, msg: 'User registered successfully!' });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const login = async (req, res) => {
  const { UserName, Password } = req.body;

  try {
    let user = await User.findOne({ UserName });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, msg: 'Logged in successfully!' });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getAuthenticatedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-Password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export default { register, login, getAuthenticatedUser };



