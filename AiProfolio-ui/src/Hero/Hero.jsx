import './Hero.css'
import React, { useEffect, useCallback, useState } from 'react';
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { Link } from 'react-router-dom';

export default function Hero() {

    const [showButton, setShowButton] = useState(false);

    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
    }, []);

    return (
        <header id="hero">
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
            <div id="hero-title">
                <div>
                    <h1 id="hero-ai"> Ai</h1>
                    <h1>Profolio</h1>
                </div>
                <p>Professional Portfolio Generator</p>
            </div>
            <Link to="/register"><button className="get-started-button" >Get Started </button></Link>
        </header>
    )

}