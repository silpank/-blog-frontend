import { useParams } from 'react-router-dom';
import { getPostApi } from '../Services/allApis';
import { useEffect, useState } from 'react';

function Post() {
  const { postId } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {

    const fetchBlog = async() => {
      try {
        const response = await getPostApi(postId);
        if (response.status === 200) {
          setBlog(response.data);
        } else {
          alert("Error Occurred");
        }

      } catch(error) {
        alert("Error fetching blogs");
        console.error('Error fetching blogs:', error);
      }
    }

    fetchBlog();
  }, []);
  
  // Now you can use postId in your component logic

  return (
    <div>
      {(blog) && (
        <>
          <h2>Post ID: {postId}</h2>
          <h2>{blog.heading}</h2>
          {
            (blog.image) && (
              <img src={`http://localhost:8000/uploads/${blog.image.split('\\')[1]}`} alt="Blog" className="blog-image img-fluid" />
          )}
        </>
      )}
      {/* Other post content */}
    </div>
  );
}

export default Post;
