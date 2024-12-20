import express from 'express';
import { body } from 'express-validator';
import { auth, checkRole } from '../middleware/auth';
import { Course } from '../models/Course';
import { Unit } from '../models/Unit';

const router = express.Router();

// Create course (teachers only)
router.post(
  '/',
  auth,
  checkRole(['teacher']),
  [
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('difficulty').isIn(['beginner', 'intermediate', 'advanced']),
  ],
  async (req, res) => {
    try {
      const { title, description, difficulty, keywords } = req.body;
      const course = new Course({
        title,
        description,
        difficulty,
        keywords,
        teacher: req.user._id,
      });

      await course.save();
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Get all active courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true })
      .populate('teacher', 'firstName lastName')
      .select('-__v');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('teacher', 'firstName lastName')
      .populate({
        path: 'units',
        select: '-__v',
        match: { isDeprecated: false },
      });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update course (teacher only)
router.put(
  '/:id',
  auth,
  checkRole(['teacher']),
  async (req, res) => {
    try {
      const course = await Course.findOne({
        _id: req.params.id,
        teacher: req.user._id,
      });

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      Object.assign(course, req.body);
      await course.save();
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Soft delete course (teacher and admin)
router.delete(
  '/:id',
  auth,
  checkRole(['teacher', 'admin']),
  async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      if (
        course.teacher.toString() !== req.user._id &&
        req.user.role !== 'admin'
      ) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      course.isActive = false;
      await course.save();
      res.json({ message: 'Course deactivated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Enroll in course (students only)
router.post(
  '/:id/enroll',
  auth,
  checkRole(['student']),
  async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);

      if (!course || !course.isActive) {
        return res.status(404).json({ error: 'Course not found' });
      }

      if (course.enrolledStudents.includes(req.user._id)) {
        return res.status(400).json({ error: 'Already enrolled' });
      }

      course.enrolledStudents.push(req.user._id);
      await course.save();

      res.json({ message: 'Enrolled successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

export default router;