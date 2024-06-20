import { Router, Request, Response } from 'express';
import User from '../Models/SignUp'; // Passen Sie den Pfad zu Ihrem User-Modell an

const router = Router();

router.post("/signUp", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create a new user instance
    const newUser = new User({ username, email, password });

    // Save the new user to the database
    await newUser.save();

    res.json({ success: true, message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});

export default router;