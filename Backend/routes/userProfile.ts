import express, { Request, Response } from 'express';
import User from '../Models/User';
import UserProfile from '../Models/Profile';

const router = express.Router();

router.get('/api/users/profile/:username', async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Transform the user data to match the UserProfile schema
    const userProfileData = {
      description: user.description,
      status: user.status,
      registeredSince: user.registeredSince,
      totalPosts: user.totalPosts,
      totalComments: user.totalComments
    };

    // Validate the transformed data against the UserProfile schema
    const userProfile = new UserProfile(userProfileData);
    const validationError = userProfile.validateSync();

    if (validationError) {
      return res.status(400).json({ message: 'Invalid user profile data', errors: validationError.errors });
    }

    res.status(200).json(userProfileData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

router.post('/api/users/profile/:username', async (req: Request, res: Response) => {
    try {
      const username = req.params.username;
      const { description, status } = req.body;
  
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user data
      user.description = description;
      user.status = status;
      await user.save();
  
      res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user profile' });
    }
  });

export default router;
