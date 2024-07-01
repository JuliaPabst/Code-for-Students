import express, { Request, Response } from 'express';
import Post from '../Models/Post';

const router = express.Router();

// Route to save new post to db
router.post('/api/posts/create', (req, res) => {
    const { username, post_content , post_title } = req.body;
    console.log('Received data:', { username, post_content , post_title });

    try {
        // create new post and save to db
        const newPost = new Post({ username, post_content, post_title });
        newPost.save();
        res.status(200).json({ message: 'Post created successfully!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving post to the database' });
      }
  });

export default router;
