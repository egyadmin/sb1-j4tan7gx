import express from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/auth';
import { ChatRoom } from '../models/ChatRoom';

const router = express.Router();

// Create chat room
router.post(
  '/',
  auth,
  [
    body('name').notEmpty(),
    body('type').isIn(['course', 'group', 'private']),
  ],
  async (req, res) => {
    try {
      const { name, type, courseId } = req.body;
      
      const chatRoom = new ChatRoom({
        name,
        type,
        courseId,
        participants: [req.user._id],
      });

      await chatRoom.save();
      res.status(201).json(chatRoom);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Get user's chat rooms
router.get('/', auth, async (req, res) => {
  try {
    const chatRooms = await ChatRoom.find({
      participants: req.user._id,
    }).populate('participants', 'firstName lastName');

    res.json(chatRooms);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Join chat room
router.post(
  '/:id/join',
  auth,
  async (req, res) => {
    try {
      const chatRoom = await ChatRoom.findById(req.params.id);
      
      if (!chatRoom) {
        return res.status(404).json({ error: 'Chat room not found' });
      }

      if (chatRoom.participants.includes(req.user._id)) {
        return res.status(400).json({ error: 'Already a participant' });
      }

      chatRoom.participants.push(req.user._id);
      await chatRoom.save();

      res.json({ message: 'Joined successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

export default router;