// Dashboard.js
import React, { useState, useEffect, useCallback } from "react";
import "./SavedTemplates.css"; 
import { RiFile2Line } from "react-icons/ri"; 
import { useNavigate} from "react-router-dom";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const Dashboard = ({user}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [portfolios, setPortfolios] = useState([]);
  const [hostedId, setHostedId] = useState(null);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);
  const particlesLoaded = useCallback(async (container) => { }, []);

  useEffect(() => {
    const fetchAllPortfolios = async () => {
      try {
        const res = await axios.get("https://aiprofolio-api.onrender.com/product/fetchAll", {
          withCredentials: true,
        });
        setPortfolios(res?.data?.portfolios)
        setHostedId(res?.data?.hosted?.hosted_id)
      } catch (error) {
      }
    };
    fetchAllPortfolios();
  }, []);

  async function setHosted(id){
    try {
      const res = await axios.post(`https://aiprofolio-api.onrender.com/product/host`,{
        idToHost:id
      } ,{
        withCredentials: true,
      });
      setHostedId(res?.data?.hostedId)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
  }, [portfolios]);

  const deletePortfolio = async (id) => {
    try {
      await axios.delete(`https://aiprofolio-api.onrender.com/product/portfolio/${id}`, { withCredentials: true });
      setPortfolios(prevPortfolios => prevPortfolios.filter(portfolio => portfolio.id !== id));
      toast.success('Deleted Portfolio!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
        
      });
    } catch (error) {
      console.error(error);
    }
  }; 

  async function copyToClipboard() {
    try {
      console.log(user)
      var copyText = `https://aiprofolio.com/public/${user?.id}`;
      await navigator.clipboard.writeText(copyText);
      toast.success('Copied To Clipboard!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
        
      });
     
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }
  

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
    <div className="MainContainer">
      <div className="dashboard">
        
        <div className="header">
          <h1>Portfolio Dashboard</h1>
        </div>

        <ToastContainer />


        {hostedId && <button  id="hostedCopyButton" onClick={copyToClipboard}>
          Copy Public Url
        </button> }

        <div className="card-container">
          {portfolios.map((portfolio) => (
            <div key={portfolio.id} className="card"
              style={{background: JSON.parse(portfolio?.template_code)?.header?.background?.background}}
              onClick={() => navigate(`/view/${portfolio.id}`)}
            >
              
              <h2
                style={{color: JSON.parse(portfolio?.template_code)?.header?.title?.color}}
              >
                {JSON.parse(portfolio.resume_data).user.name}
              </h2>
              <h2
                style={{color: JSON.parse(portfolio?.template_code)?.header?.subtitle?.color}}
              >
                {JSON.parse(portfolio.resume_data).jobAspiration}
              </h2>
              {!(hostedId === portfolio.id) && <button
                className="deleteButton"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the click event from triggering the onClick of the parent div
                  deletePortfolio(portfolio.id);
                }}
              >
                Delete
              </button>}
              <button 
              className="hostButton"
              disabled={hostedId === portfolio.id}
              onClick={(e)=>{
                setHostedId(portfolio.id)
                setHosted(portfolio.id)
                e.stopPropagation()
              }}>
                {hostedId === portfolio.id ? "Hosting" : "Host"}
              </button>
            </div>
          ))}
        </div>
        <div
          onClick={() => {
            navigate("/create");
          }}
          className="fab"
        >
          +
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
