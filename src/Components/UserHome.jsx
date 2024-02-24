import React, { useEffect, useState } from 'react';
import {allPostAPI} from '../Services/allApis';

// Function to get all posts

async function getAllPosts() {
  try {
    const response = await allPostAPI()
    console.log(response.data); // Array of posts
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}



// Trending Blog component
const TrendingBlog = ({ title, image, content }) => (
  <div className="trending-blog ">
    <img style={{height:"200px", width:"300px"}}  src={image} alt={title} />
    <h3>{title}</h3>
    <p>{content}</p>
  </div>
);

// Main Blog Component
const Blog = () => {
  useEffect(()=>{
    getAllPosts()
  },[])
  // Dummy data for trending blogs and latest posts
  const trendingBlogs = [
    { title: 'Trending Blog 1', image: 'https://cdn.pixabay.com/photo/2017/10/25/21/02/flower-2889278_960_720.jpg', content: 'Lorem ipsum dolor sit amet.' },
    { title: 'Trending Blog 2', image: 'url_to_image', content: 'Lorem ipsum dolor sit amet.' },
    { title: 'Trending Blog 3', image: 'url_to_image', content: 'Lorem ipsum dolor sit amet.' },
  ];

  

  return (
    <div className="blog">
      <h2>Trending Blogs</h2>
      <div className="trending-blogs d-flex">
        {trendingBlogs.map((blog, index) => (
          <TrendingBlog key={index} {...blog} />
        ))}
      </div>
      
    </div>
  );
};

// UserHome Component
const UserHome = () => {
  return (
    <div className='container-fluid'>
      <Blog />
    </div>
  );
}

export default UserHome;
