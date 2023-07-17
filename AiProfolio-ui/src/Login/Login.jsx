import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; 

export default function Login({ setUser, setToken }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        email,
        password,
      })
      const { user, token } = response.data
      setUser(user)
      setToken(token)
      localStorage.setItem('token', token)
    } catch (error) {
      if (error?.response?.data?.error) {
        const message = error?.response?.data?.error
        setError(message)
      }
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="loginForm">
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit" className="loginButton">
          Login
        </button>
      </form>
    </div>
  )
}
