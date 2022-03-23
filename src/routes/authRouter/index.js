const { json } = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

const authRouter = express.Router({ mergeParams: true });

authRouter.post('/login', async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        username: user.username,
      },
      'secret123',
      { expiresIn: '3h' }
    );
    res.status(200).send({ user: token });
  } else {
    res.json({ error: 'Username', msg: 'User cannot be found' });
  }
});

authRouter.post('/register', async (req, res) => {
  console.log('Registering User...');
  try {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    console.log('User registered.');
    res.status(200).send(user);
  } catch (err) {
    let error = 'Unknown';
    let msg = 'Unable to register User';

    if (err.code === 11000) {
      error = 'Username';
      msg = 'That username is already taken';
    }

    res.json({ status: 'Error', error, msg });
  }
});

module.exports = authRouter;
