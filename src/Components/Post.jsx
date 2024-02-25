import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostApi } from '../Services/allApis';
import CommentSection from './CommonSection'; // Assuming you have a CommentSection component

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
    // Toggle the like state
    setLiked(!liked);
    // Increment or decrement likes count based on the current liked state
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
          <div>
            <span>💬</span> {/* Comment symbol */}
            {/* Render comment count if available */}
            {blog.comments && <span>{blog.comments.length} Comments</span>}
          </div>
          <CommentSection postId={postId} />
        </>
      )}
      {/* Other post content */}
    </div>
  );
}

export default Post;
