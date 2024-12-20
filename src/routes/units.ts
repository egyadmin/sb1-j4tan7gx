import express from 'express';
import { body } from 'express-validator';
import { auth, checkRole } from '../middleware/auth';
import { Unit } from '../models/Unit';
import { Course } from '../models/Course';

const router = express.Router();

// Create unit (teachers only)
router.post(
  '/',
  auth,
  checkRole(['teacher']),
  [
    body('title').notEmpty(),
    body('content').notEmpty(),
    body('courseId').notEmpty(),
    body('difficulty').isIn(['beginner', 'intermediate', 'advanced']),
  ],
  async (req, res) => {
    try {
      const { title, content, courseId, difficulty, resources, order } = req.body;

      const course = await Course.findOne({
        _id: courseId,
        teacher: req.user._id,
      });

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      const unit = new Unit({
        title,
        content,
        courseId,
        difficulty,
        resources,
        order,
      });

      await unit.save();
      
      course.units.push(unit._id);
      await course.save();

      res.status(201).json(unit);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Update unit (teachers only)
router.put(
  '/:id',
  auth,
  checkRole(['teacher']),
  async (req, res) => {
    try {
      const unit = await Unit.findById(req.params.id);
      
      if (!unit) {
        return res.status(404).json({ error: 'Unit not found' });
      }

      const course = await Course.findOne({
        _id: unit.courseId,
        teacher: req.user._id,
      });

      if (!course) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      Object.assign(unit, req.body);
      await unit.save();
      res.json(unit);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Mark unit as deprecated (teachers only)
router.patch(
  '/:id/deprecate',
  auth,
  checkRole(['teacher']),
  async (req, res) => {
    try {
      const unit = await Unit.findById(req.params.id);
      
      if (!unit) {
        return res.status(404).json({ error: 'Unit not found' });
      }

      const course = await Course.findOne({
        _id: unit.courseId,
        teacher: req.user._id,
      });

      if (!course) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      unit.isDeprecated = true;
      await unit.save();
      res.json({ message: 'Unit marked as deprecated' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

export default router;