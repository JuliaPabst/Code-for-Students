import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import createPost from '../routes/createPost';
import userRegister from '../routes/UserRegister';
import userLogin from '../routes/UserLogin';
import getPosts from '../routes/getPosts';
import userProfile from '../routes/userProfile';
import commentRoutes from '../routes/commentRoutes';

const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config({ path: "../../.env" });

app.use(cors());
app.use(bodyParser.json());

// MongoDB URI
const uri = process.env.DATABASE_URL;

//MongoDB check if string undefinied
if (!uri || (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://'))) {
  console.error('Invalid MongoDB URI. Please check your .env file.');
  process.exit(1); // Terminate the application if the URI is invalid
}

// Mongoose connection
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected...'))
  .catch((err: any) => console.log(err));


// Use user routes
app.use(userRegister);
app.use(userLogin);
app.use(createPost);
app.use(getPosts);
app.use(userProfile);
app.use(commentRoutes);
//Should be removed
app.get('/comments', (req: Request, res: Response) => {
  const comments = [
    { id: 1, postId: 1, name: 'User1', email: 'user1@example.com', body: 'Comment 1 for Post 1' },
    { id: 2, postId: 1, name: 'User2', email: 'user2@example.com', body: 'Comment 2 for Post 1' },
    { id: 3, postId: 1, name: 'User3', email: 'user3@example.com', body: 'Comment 3 for Post 1' },
    { id: 4, postId: 2, name: 'User4', email: 'user4@example.com', body: 'Comment 1 for Post 2' },
    { id: 5, postId: 2, name: 'User5', email: 'user5@example.com', body: 'Comment 2 for Post 2' },
    { id: 6, postId: 2, name: 'User6', email: 'user6@example.com', body: 'Comment 3 for Post 2' },
    { id: 7, postId: 3, name: 'User7', email: 'user7@example.com', body: 'Comment 1 for Post 3' },
    { id: 8, postId: 3, name: 'User8', email: 'user8@example.com', body: 'Comment 2 for Post 3' },
    { id: 9, postId: 3, name: 'User9', email: 'user9@example.com', body: 'Comment 3 for Post 3' },
  ];
  res.json(comments);
});
//Should be removed
app.get('/posts', (req: Request, res: Response) => {
  const posts = [
    { id: 1, userId: 1, userName: 'Philip', title: 'Post 1', body: 'This is the body of post 1', date: '2024-06-06', likes: '12' },
    { id: 2, userId: 2, userName: 'Bender', title: 'Post 2', body: 'This is the body of post 2', date: '2024-06-06', likes: '24' },
    { id: 3, userId: 3, userName: 'Zoidberg', title: 'Post 3', body: 'This is the body of post 3', date: '2024-06-06', likes: '36' }
  ];
  res.json(posts);
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
