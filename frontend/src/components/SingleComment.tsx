import { useState } from 'react';
import React from 'react';
import { API_URL } from '../config';

interface Props {
  comment: Comment;
}

const SingleComment = React.memo(({ comment}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);


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
      </div>
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
          
          {comment.children && 
            <div>
            {comment.children.map(comment=>{
                return(
                  <SingleComment comment={comment}/>
                )}
            )}
          </div>
          }  
        </>
    </div>
  );
});

export default SingleComment;

