import React, { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import "./Register.css";
import ReactLoading from 'react-loading';

export default function Register({ setUser}) {
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        firstName: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState("");
    const navigate = useNavigate();

    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => { }, []);

    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:3001/auth/register", {
                first_name: form.firstName,
                email: form.email,
                password: form.password,
            }, {
                withCredentials: true,
              });
            const user = res?.data;
            setUser(user);
            navigate("/saved-templates");

        } catch (err) {
            if (err?.response?.data?.error) {
                const message = err?.response?.data?.error;
                setError(message);
                setLoading(false);
            }
        }
    };
    

    const isRegisterButtonDisabled = !(form.email && form.firstName && form.password);
    const registerButtonStyles = {
        cursor: isRegisterButtonDisabled ? "default" : "pointer",
        backgroundColor: isRegisterButtonDisabled ? "#4d935d" : "",
        filter: isRegisterButtonDisabled ? "contrast(0.75)" : "",
    };

    return (
        <>
            <Particles
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
            <div className="register-container">
                <div className="register-left">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/248/248928.png"
                        alt="User Icon"
                        className="user-icon"
                    />
                    <div className="title">
                        <h3>Register</h3>
                    </div>
                    <p>Welcome to AiProfolio. Please register to continue.</p>
                    <button className="GoogleButton">Continue with Google</button>
                    <div className="separator">
                        <div className="line"></div>
                        <span>Or</span>
                        <div className="line"></div>
                    </div>
                    {error ? (
                        <h2
                            style={{
                                position: "absolute",
                                zIndex: "999",
                                marginTop: "42vh"
                            }}
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
                    <form onSubmit={handleOnSubmit} className="registerForm">
                        <label htmlFor="firstName"></label>
                        <br />
                        <input
                            type="text"
                            placeholder="First Name"
                            id="name_input"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleOnInputChange}
                        />
                        <br />
                        <label htmlFor="email"></label>
                        <br />
                        <input
                            type="email"
                            placeholder="Email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleOnInputChange}
                        />
                        <br />
                        <label htmlFor="password"></label>
                        <br />
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleOnInputChange}
                        />
                        <br />
                        <div className="password-requirements">
                            <h4>Password must:</h4>
                            <ul>
                                <li>Have at least one uppercase character</li>
                                <li>Have at least one lowercase character</li>
                                <li>Have at least one number</li>
                                <li>Be 8 characters long</li>
                            </ul>
                        </div>
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
                                disabled={isRegisterButtonDisabled}
                                style={registerButtonStyles}
                                className="SignButton"
                            >
                                Register
                            </button>
                        }
                    </form>
                </div>
                <div className="register-right" />
            </div>
        </>
    );
}