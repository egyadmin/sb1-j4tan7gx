import mongoose from 'mongoose';

interface IQuestion {
  text: string;
  type: 'multiple_choice' | 'true_false';
  options?: string[];
  correctAnswer: string | boolean;
}

export interface IQuiz extends mongoose.Document {
  unitId: mongoose.Types.ObjectId;
  questions: IQuestion[];
  timeLimit: number;
  minimumPassingScore: number;
  isActive: boolean;
}

const quizSchema = new mongoose.Schema({
  unitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
    required: true,
  },
  questions: [{
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['multiple_choice', 'true_false'],
      required: true,
    },
    options: [{
      type: String,
    }],
    correctAnswer: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    }
  }],
  timeLimit: {
    type: Number,
    required: true,
  },
  minimumPassingScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true
});

export const Quiz = mongoose.model<IQuiz>('Quiz', quizSchema);