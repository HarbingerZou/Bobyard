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
        <>
          <p className="text-gray-700 mb-2">{comment.text}</p>
          
          {comment.image && (
            <div className="mb-2">
              <img 
                src={comment.image} 
                alt={comment.image}
                className="max-w-full h-auto rounded border"
                style={{ maxHeight: '300px' }}
              />
            </div>
          )}
          
          <div className="flex items-center gap-1 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="red" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm">{comment.likes} like{comment.likes !== 1 ? 's' : ''}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleComment;

