import React, { useState, useEffect } from 'react';
import { allPostAPI } from '../Services/allApis';
import { Carousel } from 'react-bootstrap';
import '../assets/styles/userhome.css';

function TrendingBlogs({ blogs }) {
  return (
    <div className="trending-blogs">
      <h2>Trending Blogs</h2>
      <Carousel>
        {blogs.map((blog, index) => (
          <Carousel.Item key={index}>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <img style={{height:"500px",width:"500px"}} src={blog.image} alt="Blog" className="img-fluid" />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <h3>{blog.heading}</h3>
                    <p>{blog.content}</p>
                    <p>Likes: {blog.likes.length}</p>
                    <p>Author: {blog.author && blog.author.userName}</p>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

function Cards({ blogs }) {
  return (
    <div className="all-blogs">
      <h2>All Posts</h2>
      <div className="cards-container d-flex m">
        {blogs.map((blog, index) => (
          <div key={index} className="card">
            <img  style={{height:"200px",width:"600px"}}  src={blog.image} alt="Blog" className="blog-image" />
            <div className="card-content">
              <h3>{blog.heading}</h3>
              <p>{blog.content}</p>
              <p>Likes: {blog.likes.length}</p>
              <p>Author: {blog.author && blog.author.userName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await allPostAPI();
        if (response.status === 200) {
          // Set all posts
          setBlogs(response.data);

          // Sort blogs by likes and get the top 5
          const sortedBlogs = [...response.data].sort((a, b) => b.likes.length - a.likes.length);
          const trendingSlice = sortedBlogs.slice(0, 5);

          // Set trending blogs
          setTrendingBlogs(trendingSlice);
        } else {
          alert("Error Occurred");
        }
      } catch (error) {
        alert("Error fetching blogs");
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-list">
      <TrendingBlogs blogs={trendingBlogs} />
      <Cards blogs={blogs} />
    </div>
  );
}

export default BlogList;
