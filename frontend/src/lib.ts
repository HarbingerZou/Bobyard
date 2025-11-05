import { API_URL } from './config';
const fetchComments = async (onComplete: (comments: CommentInterface[]) => void) => {
    try {
      const response = await fetch(`${API_URL}/nested`);
      const data = await response.json();
      onComplete(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } 
}

  // Add new comment
const addComment = async (onComplete: (comment: CommentInterface) => void, newComment: string) => {
    if (!newComment.trim()) return;
    
    const commentData: CommentInterface = {
      id: "986",
      parent: '',
      author: "Admin",
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
      console.log(data)
      onComplete(commentData);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
}

  // Update comment
const updateComment = async (onComplete: (comment: CommentInterface) => void, id: string, text: string) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
        });
        const updated = await response.json();
        console.log(updated)
        onComplete(updated);
    } catch (error) {
        console.error('Error updating comment:', error);
    }
}

  // Delete comment
const deleteComment = async (onComplete: (id: string) => void, id: string) => {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        console.log(id)
        onComplete(id);
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
}
export { fetchComments, addComment, updateComment, deleteComment };