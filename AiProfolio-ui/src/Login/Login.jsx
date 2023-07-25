import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUser, setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        loginForm: {
          email: email,
          password: password
        }
      });
      const { user, token } = response.data;
      setUser(user);
      setToken(token);
      navigate("/saved-templates")
      localStorage.setItem('token', token);
    } catch (error) {
      if (error?.response?.data?.error) {
        const message = error?.response?.data?.error;
        setError(message);
      }
    }
  };
  const isLoginButtonDisabled = !(email && password);
  const loginButtonStyles = {
    cursor: isLoginButtonDisabled ? 'default' : 'pointer',
    backgroundColor: isLoginButtonDisabled ? '#4d935d' : '',
    filter: isLoginButtonDisabled ? 'contrast(0.75)' : '',
  };


  return (
    <div className="login">
      <h1>Login</h1>
      <button className="Google">Continue with Google</button>
      <div className="sep">
        <div className="l"></div>
        <span>or</span>
        <div className="l"></div>
      </div>
      {error ? (<h2 id={error.length >= 22 ? (error.length > 43 ? "error-message-long" : "error-message") : "error-message-short"}>{error}</h2>) : (<></>)}
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
