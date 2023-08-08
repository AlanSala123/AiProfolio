import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import ReactLoading from 'react-loading';
import jwt_decode from "jwt-decode"

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => { }, []);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://aiprofolio-api.onrender.com/auth/login", {
        loginForm: {
          email: email,
          password: password,
        }
      }, {
        withCredentials: true,
      });
      const user = response.data;
      setUser(user);
      navigate("/saved-templates");
    } catch (error) {
      if (error?.response?.data?.error) {
        const message = error?.response?.data?.error;
        setError(message);
        setLoading(false);
      }
    }
  };

  const isLoginButtonDisabled = !(email && password);
  const loginButtonStyles = {
    cursor: isLoginButtonDisabled ? "default" : "pointer",
    backgroundColor: isLoginButtonDisabled ? "#4d935d" : "",
    filter: isLoginButtonDisabled ? "contrast(0.75)" : "",
  };

  // Define the images for the slideshow

  return (
    <><Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#383838",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 2,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#4d935d",
          },
          links: {
            color: "#4d935d",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
    />
      <div className="login-container">

        <div className="login-left">
          <img
            src="https://cdn-icons-png.flaticon.com/512/248/248928.png"
            alt="User Icon"
            className="user-icon"
          />
          <div className="title"><h3>Login</h3></div>
          <p>Welcome to AiProfolio. Please log in to continue.</p>
          <div id="signInDiv">
          {/* <button className="Google">Continue with Google</button> */}
          </div>
          <div className="separator">
            <div className="line"></div>
            <span>Or</span>
            <div className="line"></div>
          </div>


          {error ? (
            <h2
              id={
                error.length >= 22
                  ? error.length > 43
                    ? "error-message-long"
                    : "error-message"
                  : error.length <= 15 ? "error-message-shortest" : "error-message-short"
              }
            >
              {error}
            </h2>
          ) : null}
          <form onSubmit={handleLogin} className="loginForm">
            <label>
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <br />
            {
              loading ? <ReactLoading
                type="spin"
                color="#fff"
                height={50}
                width={50}
                className="loading-icon"
              /> : <button
                type="submit"
                className="loginButton"
                disabled={isLoginButtonDisabled}
                style={loginButtonStyles}
              >
                Login
              </button>
            }
          </form>

        </div>
        <div className="login-right" />
      </div></>
  );
}
