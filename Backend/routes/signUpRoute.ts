import { Router, Request, Response } from 'express';
import User from '../Models/SignUp'; // Passen Sie den Pfad zu Ihrem User-Modell an

const router = Router();

router.post("/signUp", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ success: true, message: 'Login successful', user });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});

export default router;