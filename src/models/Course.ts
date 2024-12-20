import mongoose from 'mongoose';

export interface ICourse extends mongoose.Document {
  title: string;
  description: string;
  teacher: mongoose.Types.ObjectId;
  keywords: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  units: mongoose.Types.ObjectId[];
  enrolledStudents: mongoose.Types.ObjectId[];
  isActive: boolean;
  rating: number;
  totalRatings: number;
}

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  keywords: [{
    type: String,
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  units: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
  }],
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  totalRatings: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true
});

export const Course = mongoose.model<ICourse>('Course', courseSchema);