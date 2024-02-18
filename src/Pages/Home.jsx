import React, { useState } from 'react';
import { Tabs, Tab, Form, Button, Container, Alert } from 'react-bootstrap';
import './home.css';

function Home() {
  const [isLoginForm, setLoginForm] = useState(true);

  const toggleForm = () => {
    setLoginForm(!isLoginForm);
  };

  return (
    <Container className='container'>
      <div className='wrapper'>
        <div className="title-text">
          <div className={isLoginForm ? "title login" : "title signup"}>{isLoginForm ? 'Login' : 'Signup'}</div>
        </div>
        <div className="form-container">
          <div className="slide-controls">
            <input type="radio" name="slide" className='btn-check' id="login" checked={isLoginForm} onChange={toggleForm} />
            <label htmlFor="login" className={isLoginForm ? "slide checked" : "slide"}>Login</label>
            <input type="radio" name="slide" className='btn-check' id="signup" checked={!isLoginForm} onChange={toggleForm} />
            <label htmlFor="signup" className={!isLoginForm ? "slide checked" : "slide"}>Signup</label>
          </div>
          <div className="form-div">
            <form>
              <div className="field mb-3">
                <input type="email" className="form-control" placeholder="Email Address" required />
              </div>
              <div className="field">
                <input type="password" className="form-control" placeholder="Password" required />
              </div>
              {!isLoginForm && (
                <div className="field mt-3">
                  <input type="password" className="form-control" placeholder="Confirm password" required />
                </div>
              )}
              {isLoginForm && (
                <div className="pass-link mt-1">
                  <a href="#">Forgot password?</a>
                </div>
              )}
              <div className="mb-3 mt-3">
                <button type="submit" class="btn submit-btn">{isLoginForm ? "Login" : "Signup"}</button>
              </div>
              <div className="signup-link">
                {isLoginForm ? 'Not a member?' : 'Already a member?'}
                <a href="#" onClick={toggleForm}>{isLoginForm ? 'Signup now' : 'Login now'}</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Home;
