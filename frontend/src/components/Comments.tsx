import { useState, useEffect, type ReactElement } from 'react';
import SingleComment from './SingleComment';
import { fetchComments, addComment } from '../lib';
const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [newAuthor, setNewAuthor] = useState('Admin');

  useEffect(() => {
    setLoading(true);
    fetchComments(setComments);
    setLoading(false);
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
          onClick={() => addComment((comment:Comment)=>{setComments(prev=>[comment, ...prev])}, newComment, setNewComment)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Comment
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map(comment=>
          <SingleComment key={comment._id} comment={comment} />
        )}
      </div>
    </div>
  );
};

export default Comments;

