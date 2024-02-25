import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

// Assuming this function is defined in a separate file or context
async function newPost(formData) {
  try {
    const response = await fetch('your-api-endpoint', {
      method: 'POST',
      body: formData
    });
    if (!response.ok) {
      throw new Error('Failed to create new post');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Failed to create new post: ' + error.message);
  }
}

function Header() {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null); // State to store the selected image
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleClose = () => {
    setShow(false);
    // Reset form fields and image state when modal is closed
    setImage(null);
    setTitle('');
    setDescription('');
    setCategory('');
  };

  const handleShow = () => setShow(true);
  const location = useLocation();
  const { pathname } = location;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('heading', title);
    formData.append('content', description);
    formData.append('blogType', category);
    formData.append('image', image);
    formData.append('date', "12-02-2022");

    try {
      const response = await newPost(formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <MDBNavbar light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
            <i className="fa-solid fa-blog mx-2"></i>
            Blog
          </MDBNavbarBrand>
          {(pathname !== '/Auth' || pathname !== '/') && (
            <Button onClick={handleShow}>New Post</Button>
          )}
        </MDBContainer>
      </MDBNavbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <input type="text" className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Image</label>
              <input type="file" className="form-control" id="image" onChange={handleImageChange} accept="image/*" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Header;
