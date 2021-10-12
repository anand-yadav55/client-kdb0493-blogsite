const router = require('express').Router();

const User = require('../models/users');

// Register
router.post('/register', async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;
    // validate

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.json({ msg: 'An account with this email already exists.' });

    if (!displayName) displayName = email;

    const newUser = new User({
      email: email,
      password: password,
      displayName: displayName,
    });

    const savedUser = await newUser.save();
    res.json(savedUser._id);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate
    if (!email || !password)
      return res.json({ msg: 'Not all fields have been entered.' });

    const user = await User.findOne({ email: email });

    if (!user)
      return res.json({
        msg: 'No account with this email has been registered.',
      });

    const isMatch = user.password === password;

    if (!isMatch) {
      return res.json({ msg: 'Invalid credentials.' });
    }

    res.send({
      user: {
        id: user._id,
        displayName: user.displayName,
        token: user._id,
      },
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
