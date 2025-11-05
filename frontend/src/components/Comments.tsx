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

  const updateComment = (
    comments: CommentInterface[],
    updatedComment: CommentInterface
  ): CommentInterface[] => {
    return comments.map((comment) => {
      if (comment._id === updatedComment._id) {
        return updatedComment;
      }
      return comment;
    });
  };

  const deleteComment = (
    comments: CommentInterface[],
    updatedComment: CommentInterface
  ): CommentInterface[] => {
    const output: CommentInterface[] = comments.filter((comment) => {
      if (comment._id === updatedComment._id) {
        return false;
      }
      return true;
    });
    return output;
  };
  const handleCommentUpdate = (updatedComment: CommentInterface) => {
    setComments((prevComments) => updateComment(prevComments, updatedComment));
  };

  const handleCommentDelete = (deletedComment: CommentInterface) => {
    setComments((prevComments) => deleteComment(prevComments, deletedComment));
    setCount((count) => count - 1);
  };
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
          <SingleComment
            key={comment._id}
            comment={comment}
            onCommentUpdate={handleCommentUpdate}
            onCommentDelete={handleCommentDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
