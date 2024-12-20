import mongoose from 'mongoose';

export interface IUnit extends mongoose.Document {
  title: string;
  courseId: mongoose.Types.ObjectId;
  content: string;
  resources: {
    type: 'video' | 'pdf';
    url: string;
    title: string;
  }[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  order: number;
  quiz: mongoose.Types.ObjectId;
  isDeprecated: boolean;
}

const unitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  resources: [{
    type: {
      type: String,
      enum: ['video', 'pdf'],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    }
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
  },
  isDeprecated: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

export const Unit = mongoose.model<IUnit>('Unit', unitSchema);