import express, { Request, Response } from 'express';
import User from '../Models/User';

const router = express.Router();

// Route to register a new user
router.post('/api/users/register', (req, res) => {
    const { username, email, password, description } = req.body;
    console.log('Received data:', { username, email, password, description });

    try {
        // Erstellen eines neuen Benutzers und Speichern in der Datenbank
        const newUser = new User({ username, email, password, description });
        newUser.save();
        res.status(200).json({ message: 'User registered successfully', newUser });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving user to the database' });
      }
  });

export default router;
