import React, { useState, useEffect } from 'react';
import { allPostAPI } from '../Services/allApis';

function TrendingBlogs({blogs}) {
  return (
    <div className="cards-container">
      {blogs.map((blog,index) => (
        <div key={index} className="card">
          <h3>{blog.heading}</h3>
          <p>{blog.content}</p>
          <p>Likes: {blog.likes.length}</p>
          <p>Author: {blog.author.userName}</p>
        </div>
      ))}
    </div>
  );
}

function Cards({blogs}) {
  return (
    <div className="cards-container">
      {blogs.map((blog,index) => (
        <div key={index} className="card">
          <h3>{blog.heading}</h3>
          <p>{blog.content}</p>
          <p>Likes: {blog.likes.length}</p>
          <p>Author: {blog.author.userName}</p>
        </div>
      ))}
    </div>
  );
}

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);

  useEffect(() => {
    // Fetch blog data from your backend API
    const fetchBlogs = async () => {
      try {
        const response = await allPostAPI();
        if (response.status === 200) {
          const sortedBlogs = [...response.data].sort((a, b) => b.likes - a.likes);
          setBlogs(response.data);
          setTrendingBlogs(sortedBlogs.slice(0, Math.min(sortedBlogs.length, 5)));
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
      <div className="trending-blogs">
        <h2>Trending Blogs</h2>
        <TrendingBlogs blogs={trendingBlogs} />
      </div>
      <div className="all-blogs">
        <h2>All Posts</h2>
        <Cards blogs={blogs} />
      </div>
    </div>
  );
}

export default BlogList;
