import express, { Request, Response } from 'express';
import Post from '../Models/Post';

const router = express.Router();

  // get route for all posts
  router.get('/api/posts', async (req: Request, res: Response) => {
    try {
      const posts = await Post.find(); // Retrieves all documents from the 'posts' collection
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching posts from the database' });
    }
  });

export default router;
