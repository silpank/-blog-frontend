import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostApi } from '../Services/allApis';
import { addLikeAPI, removeLikeAPI, addCommentAPI } from '../Services/allApis';
import '../assets/styles/post.css'
import { Button } from 'react-bootstrap';

function Post() {
  const { postId } = useParams();
  const [blog, setBlog] = useState({});
  const [showComment, setShowComment] = useState(false)
  const [sampleValue, setSampleValue] = useState(false)
  const [commentValue, setCommentValue] = useState('')
  const userId = JSON.parse(sessionStorage.getItem("existingUser"))['_id'];

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getPostApi(postId);
        if (response.status === 200) {
          setBlog(response.data);
        } else {
          alert("Error Occurred");
        }
      } catch (error) {
        alert("Error fetching blogs");
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlog();
  }, [sampleValue]);

  const handleLike = async (bool) => {
    if (bool) {
      try {

        const response = await removeLikeAPI(postId);
        if (response.status === 200) {
          setSampleValue(!sampleValue)
        } else {
          alert("Error Occurred");
        }
      } catch (error) {
        alert("Error fetching blogs");
        console.error('Error fetching blogs:', error);
      }
    } else {
      try {
        const response = await addLikeAPI(postId);
        if (response.status === 200) {
          setSampleValue(!sampleValue)
        } else {
          alert("Error Occurred");
        }
      } catch (error) {
        alert("Error fetching blogs");
        console.error('Error fetching blogs:', error);
      }
    }
  };

  const toogleCommentSection = () => {
    setShowComment(!showComment)
  }

  const handleCommentChange = (e) => {
    setCommentValue(e.target.value)
  }

  const handleComment = async () => {
    try {
      const data = {
        'comment': commentValue,
        'date': "26-02-2024"
      }
      const response = await addCommentAPI(postId,data);
      if (response.status === 200) {
        setCommentValue('')
        setSampleValue(!sampleValue)
      } else {
        alert("Error Occurred");
      }
    } catch (error) {
      alert("Error fetching blogs");
      console.error('Error fetching blogs:', error);
    }
  }

  return (
    <div className="post-container">
      <div className="user-info">
        {/* User photo */}
        <img src={"https://st2.depositphotos.com/2783505/11506/i/600/depositphotos_115061800-stock-photo-passport-photo-of-a-young.jpg"} alt="User" className="user-photo" />
        {/* Username */}
        <div className="username">{blog.userName}</div>
        {/* Date of post */}
        <div className="post-date">{blog.date}</div>
      </div>
      {Object.keys(blog).length !== 0 && (
        <>
          <h2>{blog.heading}</h2>
          <img
            src={`http://localhost:8000/uploads/${blog.image.split('\\')[1]}`}
            alt="Blog"
            className="blog-image img-fluid"
          />
          <div className='icon-section'>
            <div className='like-icon-section'>
              <span onClick={() => handleLike(blog.likes.some(like => like._id === userId))} className='like-icon'>
                {blog.likes.some(like => like._id === userId) ? <i className="fa-solid fa-heart liked"></i> : <i className="fa-regular fa-heart"></i>}
              </span>
              <span>{blog.likes.length}</span>
            </div>
            <div className='comment-icon-section'>
              <span className='comment-icon' onClick={toogleCommentSection}>
                <i className="fa-regular fa-comment"></i>
              </span>
              <span>{blog.comments.length}</span>
            </div>
          </div>
          <div className='comments-section'>
            {showComment && (
              <>
                {blog.comments.map((comment, index) => (
                  <div key={index}>
                    <CommentSection comment={comment} />
                  </div>
                ))}
              </>
            )}
            <div>
                <input
                  type="text"
                  name="comment"
                  placeholder="Comment"
                  value={commentValue}
                  onChange={handleCommentChange}
                />
              <Button onClick={handleComment}>Comment</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function CommentSection({ comment }) {
  return (
    <div>
      <div>
        <div className='commentedUser'>{comment.commenter?.userName || 'Unknown User'}</div>
        <div className='commentedDate'>{comment.date}</div>
        <div className='comment'>{comment.comment}</div>
      </div>
    </div>
  );
}
export default Post;
