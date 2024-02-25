import React, { useState } from 'react';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdb-react-ui-kit';

function Header({ isAuthenticated }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    blogType: '',
    heading: '',
    image: '',
    content: ''
  });

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    // Add your logic to handle form submission (e.g., API call)
    console.log(formData);
    toggleModal();
  };

  return ( 
    <div>
      {isAuthenticated && (
        <MDBNavbar light bgColor='light'>
          <MDBContainer fluid>
            <MDBNavbarBrand href='#'>
              <i className="fa-solid fa-blog mx-2"></i>
              Blog
            </MDBNavbarBrand>
            <MDBBtn color='primary' onClick={toggleModal}>New Post</MDBBtn>
          </MDBContainer>
        </MDBNavbar>
      )}

      {/* Debugging: Check if modalOpen state is true */}
      {modalOpen && <div>Modal is open</div>}

      {/* Debugging: Check if modal component is rendered */}
      <MDBModal show={modalOpen} onHide={toggleModal}>
        <MDBModalHeader>New Post</MDBModalHeader>
        <MDBModalBody>
          {/* Add form inputs */}
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color='secondary' onClick={toggleModal}>Close</MDBBtn>
          <MDBBtn color='primary' onClick={handleSubmit}>Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </div>
  )
}

export default Header;
