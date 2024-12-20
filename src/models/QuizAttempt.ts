import mongoose from 'mongoose';

export interface IQuizAttempt extends mongoose.Document {
  student: mongoose.Types.ObjectId;
  quiz: mongoose.Types.ObjectId;
  answers: {
    questionId: mongoose.Types.ObjectId;
    answer: string | boolean;
  }[];
  score: number;
  completed: boolean;
  startTime: Date;
  endTime?: Date;
}

const quizAttemptSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  answers: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    answer: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    }
  }],
  score: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: Date,
}, {
  timestamps: true
});

export const QuizAttempt = mongoose.model<IQuizAttempt>('QuizAttempt', quizAttemptSchema);