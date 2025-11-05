import { useState, useEffect } from "react";
import SingleComment from "./SingleComment";
import { fetchComments, getCommentsCounts } from "../lib";
import CommentInput from "./CommentInput";
const Comments = () => {
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  useEffect(() => {
    setLoading(true);
    fetchComments(setComments);
    getCommentsCounts(setCount);
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="p-4 h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Comments</h1>

      <CommentInput
        setComments={setComments}
        count={count}
        setCount={setCount}
      />

      <div>
        <p>Current Comment Count: {count}</p>
      </div>
      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <SingleComment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
