const User = require('../models/User');

const userController = {};
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

userController.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      console.log('already user', user);
      throw new Error('already registed user!');
    }

    if (!name) {
      console.log('You should add your name!');
      throw new Error('You should add your name!');
    }

    if (!email) {
      console.log('You should add your email!');
      throw new Error('You should add your email!');
    }

    if (!password) {
      console.log('You should add your password!');
      throw new Error('You should add your password!');
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email,
      name,
      password: hash,
    });

    await newUser.save();
    res.status(200).json({ status: 'Success' });
  } catch (error) {
    res.status(400).json({ status: 'Failed', message: error.message });
    //중복이라 안되는지 그냥안되는지 파악을 위해 추가
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: 'Failed', message: 'Email or password is empty!' });
    }

    const user = await User.findOne(
      { email: email },
      '-createdAt -updatedAt -__v'
    );

    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const token = user.generateToken();
        return res.status(200).json({ status: 'Success', user, token });
      }
    }
    return res.status(400).json({
      status: 'Failed',
      message: 'Email or password is not matching!',
    });
  } catch (error) {
    res.status(500).json({ status: 'Failed', message: error.message });
  }
};

userController.getUser = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Can not find user!');
    }
    res.status(200).json({ status: 'Success', user });
  } catch (error) {
    res.status(400).json({ status: 'Failed', error: error.message });
  }
};

module.exports = userController;
