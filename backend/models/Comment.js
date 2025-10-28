import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
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
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

