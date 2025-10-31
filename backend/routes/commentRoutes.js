import express from 'express';
import Comment from '../models/Comment.js';

const router = express.Router();

// GET all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ date: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/nested', async (req, res) => {
  try {
    const comments_raw = await Comment.find().sort({ date: -1 });
    const comments = JSON.parse(JSON.stringify(comments_raw))
    const map = new Map()
    for(const comment of comments){
      map.set(comment.id, comment)
    }
    for(const comment of comments){
      const p_id = comment.parent
      const parent = map.get(p_id)
      if(!parent){
        continue
      }
      if(!parent.children){
        parent.children = []
      }
      parent.children.push(comment)
    }
    const output = comments.filter(c=>c.parent === "")
    //console.log(JSON.parse(JSON.stringify(root)))
    res.json(output);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

// GET single comment by ID
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new comment
router.post('/', async (req, res) => {
  try {
    const commentData = {
      ...req.body,
      date: req.body.date ? new Date(req.body.date) : new Date()
    };
    const comment = new Comment(commentData);
    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update comment by ID
router.put('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE comment by ID
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.json({ message: 'Comment deleted successfully', comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;

