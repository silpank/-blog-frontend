import React, { useState, useEffect } from 'react';
import { allPostAPI } from '../Services/allApis';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/userhome.css';
import '../assets/styles/carousal.css';

function TrendingBlogs({ blogs }) {
  const navigate = useNavigate();

  const handleBlogClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="trending-blogs">
      <h2 className='trending-blogs-heading'>Trending</h2>
      <Carousel className='trending-carousal' interval={2000}>
        {blogs.map((blog, index) => (
          <Carousel.Item key={index} onClick={() => handleBlogClick(blog._id)}>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <img src={`http://localhost:8000/uploads/${blog.image.split('\\')[1]}`} alt="Blog" className="img-fluid" />
                </div>
                <div className="col-md-6 carousal-content">
                  <div className="contents">
                    <h3>{blog.heading}</h3>
                    <p>Likes: {blog.likes.length}</p>
                    <p>Author: {blog.author.userName}</p>
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
  const navigate = useNavigate();

  const handleBlogClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="all-blogs">
      <div className='row g-5 cards-container'>
        <h2 className='all-blogs-header'>All Posts</h2>
        {blogs.map((blog, index) => (
          <div className='col-lg-4' key={index} onClick={() => handleBlogClick(blog._id)}>
            <div className='cards'>
              <div className='card-image'>
                <img src={`http://localhost:8000/uploads/${blog.image.split('\\')[1]}`} alt="Blog" className="blog-image img-fluid" />
              </div>
              <div className="card-content">
                <h3>{blog.heading}</h3>
                <p>Likes: {blog.likes.length}</p>
                <p>Author: {blog.author && blog.author.userName}</p>
              </div>
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
      <div className='container'>
        <TrendingBlogs blogs={trendingBlogs} />
        <Cards blogs={blogs} />
      </div>
    </div>
  );
}

export default BlogList;
