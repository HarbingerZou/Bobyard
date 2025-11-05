import { addComment } from "../lib";
import { useState } from "react";

interface CommentInputProps {
  setComments: React.Dispatch<React.SetStateAction<CommentInterface[]>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function CommentInput({
  setComments,
  count,
  setCount,
}: CommentInputProps) {
  const [newComment, setNewComment] = useState("");
  return (
    <div className="mb-6 p-4 border rounded">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
        placeholder="Add a comment..."
        rows={3}
      />
      <button
        onClick={() =>
          addComment(
            (comment: CommentInterface) => {
              setComments((prev) => [comment, ...prev]);
              setCount((count) => count + 1);
            },
            newComment,
            count
          )
        }
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Comment
      </button>
    </div>
  );
}
