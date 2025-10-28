import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: ''
  }
}, {
  id: false, // Disable id virtual to use _id only
  _id: true  // Explicitly keep _id
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

