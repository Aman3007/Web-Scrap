import mongoose from 'mongoose';

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    url: {
      type: String,
      trim: true,
      default: '',
    },
    points: {
      type: Number,
      default: 0,
      min: 0,
    },
    author: {
      type: String,
      trim: true,
      default: 'unknown',
    },
    postedAt: {
      type: String,
      default: '',
    },
    hackerNewsId: {
      type: String,
      unique: true,
      sparse: true,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


storySchema.index({ points: -1, createdAt: -1 });
storySchema.index({ hackerNewsId: 1 });
storySchema.index({ title: 'text' });

const Story = mongoose.model('Story', storySchema);
export default Story;
