import { useState, useEffect, useCallback } from 'react';
import SingleComment from './SingleComment';

interface Comment {
  _id: string;
  author: string;
  text: string;
  date: string;
  likes: number;
  image: string;
}
const API_URL = 'http://localhost:3000/api/comments';

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [newAuthor, setNewAuthor] = useState('Admin');


  // Fetch comments
  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add new comment
  const addComment = useCallback(async () => {
    if (!newComment.trim()) return;
    
    const commentData = {
      author: newAuthor,
      text: newComment,
      date: new Date().toISOString(),
      likes: 0,
      image: ''
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData)
      });
      const data = await response.json();
      setComments(prev => [data, ...prev]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }, [newComment, newAuthor]);

  // Update comment
  const updateComment = useCallback(async (id: string, text: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const updated = await response.json();
      setComments(prev => prev.map(c => c._id === id ? updated : c));
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  }, []);

  // Delete comment
  const deleteComment = useCallback(async (id: string) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      setComments(prev => prev.filter(c => c._id !== id));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, []);

  if (loading) return <div className="p-4 h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Comments</h1>
      
      {/* Add Comment */}
      <div className="mb-6 p-4 border rounded">
        <input
          type="text"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          placeholder="Author"
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          placeholder="Add a comment..."
          rows={3}
        />
        <button
          onClick={addComment}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Comment
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <SingleComment
            key={comment._id}
            comment={comment}
            onUpdate={updateComment}
            onDelete={deleteComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;

