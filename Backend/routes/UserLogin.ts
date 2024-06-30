import express from 'express';
import User from '../Models/User'; // Importiere das User-Modell

const router = express.Router();

router.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received login data:', { email, password });

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

export default router;
