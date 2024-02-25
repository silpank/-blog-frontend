import React, { useState } from 'react';

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Function to handle adding a new comment
  const handleAddComment = () => {
    // Here you would typically send the new comment to your backend and update the comments state
    // For demonstration purposes, let's just update the state with the new comment locally
    setComments([...comments, newComment]);
    setNewComment(''); // Clear the input field after adding the comment
  };

  return (
    <div>
      <h3>Comments</h3>
      <div>
        {/* Display existing comments */}
        {comments.map((comment, index) => (
          <div key={index}>{comment}</div>
        ))}
      </div>
      {/* Input field for adding a new comment */}
      <div>
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Post</button>
      </div>
    </div>
  );
}

export default CommentSection;
