import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  prompt: {
    type: String,
    required: [true, 'User request/prompt is required'],
    trim: true
  },
  reasoningSteps: {
    type: [String],
    default: []
  },
  responsePlan: {
    source: String,
    destination: String,
    budget: Number,
    days: Number,
    travelers: Number,
    itinerary: mongoose.Schema.Types.Mixed,
    costBreakdown: mongoose.Schema.Types.Mixed,
    recommendations: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

chatSchema.index({ user: 1, createdAt: -1 });

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;