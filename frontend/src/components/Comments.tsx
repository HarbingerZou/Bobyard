import { useState, useEffect } from "react";
import SingleComment from "./SingleComment";
import { fetchComments, getCommentsCounts } from "../lib";
import CommentInput from "./CommentInput";
import { API_URL } from "../config";
const Comments = () => {
  const [commentsPlain, setCommentsPlain] = useState<
    Map<string, CommentInterface>
  >(new Map());
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [filteredComment, setFilterComments] = useState<CommentInterface[]>([]);

  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState<string>("");
  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(`${API_URL}/`);
        const data: CommentInterface[] = await response.json();
        const newMap = new Map();
        for (const comment of data) {
          newMap.set(comment.id, comment);
        }
        setCommentsPlain(newMap);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
    load();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchComments(setComments);
    getCommentsCounts(setCount);
    setLoading(false);
  }, []);

  function getNewList() {
    const set = new Set<CommentInterface>();
    function find(comment: CommentInterface) {
      if (comment.text.toLowerCase().includes(query.toLowerCase())) {
        set.add(comment);
      }
      if (comment.children) {
        for (const child of comment.children) {
          find(child);
        }
      }
    }

    for (const comment of comments) {
      find(comment);
    }
    const p_set = new Set<CommentInterface>();
    for (const comment of set) {
      const p_id = comment.parent;
      const p_comment = commentsPlain.get(p_id);
      if (!p_comment) {
        p_set.add(comment);
      } else {
        if (!p_comment.children) {
          p_comment.children = [];
        }
        p_comment.children.push(comment);
        p_set.add(p_comment);
      }
    }
    setFilterComments([...p_set]);
  }

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
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          className="w-full border border-grat-200"
        />
        <button onClick={getNewList}>filter</button>
      </div>
      <div>
        <p>Current Comment Count: {count}</p>
      </div>
      {/* Comments List */}
      <div className="space-y-4">
        {filteredComment.map((comment) => (
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
