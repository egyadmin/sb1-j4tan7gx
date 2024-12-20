import express from 'express';
import { body } from 'express-validator';
import { auth, checkRole } from '../middleware/auth';
import { Quiz } from '../models/Quiz';
import { QuizAttempt } from '../models/QuizAttempt';
import { Unit } from '../models/Unit';
import { Course } from '../models/Course';

const router = express.Router();

// Create quiz (teachers only)
router.post(
  '/',
  auth,
  checkRole(['teacher']),
  [
    body('unitId').notEmpty(),
    body('questions').isArray({ min: 1 }),
    body('timeLimit').isInt({ min: 1 }),
    body('minimumPassingScore').isInt({ min: 0, max: 100 }),
  ],
  async (req, res) => {
    try {
      const { unitId, questions, timeLimit, minimumPassingScore } = req.body;

      const unit = await Unit.findById(unitId);
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

      const quiz = new Quiz({
        unitId,
        questions,
        timeLimit,
        minimumPassingScore,
      });

      await quiz.save();

      unit.quiz = quiz._id;
      await unit.save();

      res.status(201).json(quiz);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Start quiz attempt (students only)
router.post(
  '/:id/attempt',
  auth,
  checkRole(['student']),
  async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.id);
      if (!quiz || !quiz.isActive) {
        return res.status(404).json({ error: 'Quiz not found' });
      }

      const existingAttempt = await QuizAttempt.findOne({
        student: req.user._id,
        quiz: quiz._id,
        completed: false,
      });

      if (existingAttempt) {
        return res.status(400).json({ error: 'Ongoing attempt exists' });
      }

      const attempt = new QuizAttempt({
        student: req.user._id,
        quiz: quiz._id,
        startTime: new Date(),
      });

      await attempt.save();
      res.status(201).json(attempt);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Submit quiz attempt (students only)
router.post(
  '/:id/submit',
  auth,
  checkRole(['student']),
  [body('answers').isArray()],
  async (req, res) => {
    try {
      const { answers } = req.body;

      const attempt = await QuizAttempt.findOne({
        _id: req.params.id,
        student: req.user._id,
        completed: false,
      });

      if (!attempt) {
        return res.status(404).json({ error: 'Attempt not found' });
      }

      const quiz = await Quiz.findById(attempt.quiz);
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }

      // Calculate score
      let correctAnswers = 0;
      answers.forEach((answer: any) => {
        const question = quiz.questions.find(
          (q) => q._id.toString() === answer.questionId
        );
        if (question && question.correctAnswer === answer.answer) {
          correctAnswers++;
        }
      });

      const score = (correctAnswers / quiz.questions.length) * 100;

      attempt.answers = answers;
      attempt.score = score;
      attempt.completed = true;
      attempt.endTime = new Date();
      await attempt.save();

      res.json({
        score,
        passed: score >= quiz.minimumPassingScore,
        correctAnswers,
        totalQuestions: quiz.questions.length,
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

export default router;