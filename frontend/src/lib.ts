import { API_URL } from "./config";
const getCommentsCounts = async (onComplete: (count: number) => void) => {
  try {
    const response = await fetch(`${API_URL}/count`);
    const data = await response.json();
    onComplete(data);
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};
const fetchComments = async (
  onComplete: (comments: CommentInterface[]) => void
) => {
  try {
    const response = await fetch(`${API_URL}/nested`);
    const data = await response.json();
    onComplete(data);
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

// Add new comment
const addComment = async (
  onComplete: (comment: CommentInterface) => void,
  newComment: string,
  id: number
) => {
  if (!newComment.trim()) return;

  const commentData: CommentInterface = {
    _id: "",
    id: id.toString(),
    parent: "",
    author: "Admin",
    text: newComment,
    date: new Date().toISOString(),
    likes: 0,
    image: "",
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    });
    const data = await response.json();
    console.log(data);
    onComplete(data);
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};

// Update comment
const updateComment = async (
  id: string,
  text: string,
  onComplete?: (comment: CommentInterface) => void
) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const updated = await response.json();
    console.log(updated);
    if (onComplete) {
      onComplete(updated);
    }
  } catch (error) {
    console.error("Error updating comment:", error);
  }
};

// Delete comment
const deleteComment = async (
  id: string,
  onComplete?: (comment: CommentInterface) => void
) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(id);
    if (onComplete) {
      onComplete(data);
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};
export {
  getCommentsCounts,
  fetchComments,
  addComment,
  updateComment,
  deleteComment,
};
