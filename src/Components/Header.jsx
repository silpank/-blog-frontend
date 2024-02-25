import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const location = useLocation();
  const { pathname } = location;

  return ( 
    <div>
        <MDBNavbar light bgColor='light'>
          <MDBContainer fluid>
            <MDBNavbarBrand href='#'>
              <i className="fa-solid fa-blog mx-2"></i>
              Blog
            </MDBNavbarBrand>
            {
              (pathname !== '/Auth' || pathname !== '/') && (
                <Button onClick={handleShow}>New Post</Button>
              )
            }
          </MDBContainer>
        </MDBNavbar>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}

export default Header;
