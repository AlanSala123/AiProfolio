import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; 

export default function Login({ setUser, setToken }) {
  // State variables for email, password, and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle login form submission
  const handleLogin = async (e) => {
    // Makes it so the page doesnt reload
    e.preventDefault();
    try {
      // Send a POST request to the login endpoint with email and password
      const response = await axios.post('http://localhost:3001/auth/login', {
        loginForm: {
          email:email,
          password: password
        }
      });

      // Extract user and token from the response data
      const { user, token } = response.data;

      // Update the user and token in the parent component
      setUser(user);
      setToken(token);

      // Store the token in localStorage for future use
      localStorage.setItem('token', token);
    } catch (error) {
      // If there is an error in the response, extract and set the error message
      if (error?.response?.data?.error) {
        const message = error?.response?.data?.error;
        setError(message);
      }
    }
  };

  // Determine if the login button should be disabled based on email and password inputs
  const isLoginButtonDisabled = !(email && password);

  // Determine the styles for the login button based on its disabled state
const loginButtonStyles = {
  // If the button is disabled, set the cursor to 'default', otherwise set it to 'pointer'
  cursor: isLoginButtonDisabled ? 'default' : 'pointer',

  // If the button is disabled, set the background color to '#4d935d', otherwise leave it empty
  backgroundColor: isLoginButtonDisabled ? '#4d935d' : '',

  // If the button is disabled, apply a contrast filter of 0.75, otherwise leave it empty
  filter: isLoginButtonDisabled ? 'contrast(0.75)' : '',
};


  return (
    <div className="login">
      <h1>Login</h1>
      {error ? (<h2 id={error.length >= 22 ? (error.length > 43 ? "error-message-long" : "error-message" ) : "error-message-short"}>{error}</h2>) : (<></>)}
      <form onSubmit={handleLogin} className="loginForm">
        <label>
          <input
            type="email"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button 
          type="submit"
          className="loginButton"
          disabled={isLoginButtonDisabled}
          style={loginButtonStyles}
        >
          Login
        </button>
      </form>
    </div>
  );
}
