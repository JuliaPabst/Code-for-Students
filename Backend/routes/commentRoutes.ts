import express, { Request, Response } from 'express';
import Comment from '../Models/Comment';

const router = express.Router();

// Route to get all comments for a given postId
router.get('/api/comments/:postId', async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ postId });

    if (!comments) {
      return res.status(404).json({ message: 'No comments found for this post' });
    }

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
});

// Route to add a new comment
// 
router.post('/api/comments', async (req: Request, res: Response) => {
  try {
    const { postId, name, email, body } = req.body;

    if (!postId || !name || !email || !body) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newComment = new Comment({
      postId,
      name,
      email,
      body,
    });

    await newComment.save();
    res.status(201).json({ message: 'Comment added successfully', newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding comment' });
  }
});

export default router;
