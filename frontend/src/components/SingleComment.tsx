import { useState } from 'react';

interface Comment {
  _id: string;
  author: string;
  text: string;
  date: string;
  likes: number;
  image: string;
}

interface Props {
  comment: Comment;
  onUpdate: (id: string, updatedText: string) => void;
  onDelete: (id: string) => void;
}

const SingleComment = ({ comment, onUpdate, onDelete }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  const handleSave = () => {
    onUpdate(comment._id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(comment.text);
    setIsEditing(false);
  };

  return (
    <div className="p-4 border rounded">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-semibold">{comment.author}</p>
          <p className="text-sm text-gray-500">
            {new Date(comment.date).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          {!isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-2 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(comment._id)}
                className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      
      {isEditing ? (
        <div>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            rows={3}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700">{comment.text}</p>
      )}
    </div>
  );
};

export default SingleComment;

