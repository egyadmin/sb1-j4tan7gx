import mongoose from 'mongoose';

export interface IChatRoom extends mongoose.Document {
  name: string;
  courseId?: mongoose.Types.ObjectId;
  type: 'course' | 'group' | 'private';
  participants: mongoose.Types.ObjectId[];
  messages: {
    sender: mongoose.Types.ObjectId;
    content: string;
    timestamp: Date;
  }[];
}

const chatRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
  type: {
    type: String,
    enum: ['course', 'group', 'private'],
    required: true,
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    }
  }]
}, {
  timestamps: true
});

export const ChatRoom = mongoose.model<IChatRoom>('ChatRoom', chatRoomSchema);