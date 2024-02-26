import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostApi } from '../Services/allApis';

function Post() {
  const { postId } = useParams();
  const [blog, setBlog] = useState({});
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getPostApi(postId);
        if (response.status === 200) {
          setBlog(response.data);
          setLikesCount(response.data.likes); // Assuming likes count is provided in the response
        } else {
          alert("Error Occurred");
        }
      } catch (error) {
        alert("Error fetching blogs");
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlog();
  }, [postId]);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <div>
      {blog && (
        <>
          <h2>{blog.heading}</h2>
          {blog.image && (
            <img
              src={`http://localhost:8000/uploads/${blog.image.split('\\')[1]}`}
              alt="Blog"
              className="blog-image img-fluid"
            />
          )}
          <div>
            <span onClick={handleLike} style={{ cursor: 'pointer' }}>
              {liked ? '❤️' : '🖤'} {/* Heart symbol */}
            </span>
            <span>{likesCount} Likes</span>
          </div>
          <CommentSection postId={postId} />
        </>
      )}
    </div>
  );
}

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    setComments([...comments, newComment]);
    setNewComment('');
  };

  return (
    <div>
      <h3>Comments</h3>
      <div>
        {comments.map((comment, index) => (
          <div key={index}>{comment}</div>
        ))}
      </div>
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

export default Post;
