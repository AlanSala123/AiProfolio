import "./App.css";
import Hero from "../Hero/Hero";
import LandingNavbar from "../LandingNavbar/LandingNavbar";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Register from "../Register/Register";
import axios from "axios";
import OurServices from "../OurServices/OurServices";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import AboutUs from "../About/About";
import Dashboard from "../SavedTemplates/SavedTemplates";
import Header from "../Components/Header/Header";
import Skills from "../Components/Skills/Skills";
import Projects from "../Components/Projects/Projects";
import Navbar from "../Components/Navbar/Navbar";
import Create from "../Create/Create";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Education from "../Components/Education/Education";
import Experience from "../Components/Experiences/Experiences";
import AboutMe from "../Components/AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // function handleCallbackResponse(response) {
  //   console.log("Encoded JWT ID token: " + response.credential);
  //   let userObject = jwt_decode(response.credential);
  //   console.log(userObject)
  //   setUser(userObject)
  // }

  // useEffect(() => {
  //   google.accounts.id.initialize({
  //     client_id: "10044743293-9g3fvpge6cr85l61e953q65q2po580lj.apps.googleusercontent.com",
  //     callback: handleCallbackResponse
  //   })

  //   google.accounts.id.renderButton(
  //     document.getElementById("signInDiv"),
  //     {theme: "outline", size: "large"}
  //   )
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://aiprofolio-api.onrender.com/auth/user", {
          withCredentials: true,
        });
        const newUser = res?.data?.user;
        setUser(newUser);
      } catch (error) {
        handleLogout();
      }
    };
    fetchUser();
  }, []);
  
  async function handleLogout() {
    try {
      await axios.post('https://aiprofolio-api.onrender.com/auth/logout', {}, { withCredentials: true })
      setUser(null);
      if (!location.pathname.startsWith("/public/")){
        // Only navigate if the user is logged out and not on a /public/ route
        if (location.pathname !== '/') {
          navigate('/');
        }
      }
    } catch (error) {
    }
  }
  

  return (
    <>
      {!location.pathname.startsWith("/public/") && <LandingNavbar user={user} handleLogout={handleLogout} />}
      <Routes>
        <Route path="/public/:id" element={<Portfolio user={user} isPublic={true} />} />
        <Route path="/Loading" element={<LoadingScreen />} />
        <Route path="/view/:id" element={<Portfolio user={user} />} />
        <Route path="/create" element={user ? <Create user={user} /> : <Navigate to="/Login" replace />} />
        <Route path="/saved-templates" element={user ? <Dashboard user={user} /> : <Navigate to="/Login" replace />} />
        <Route path="/Register" element={user ? <Navigate to="/saved-templates" replace /> : <Register setUser={setUser} />} />
        <Route path="/Login" element={user ? <Navigate to="/saved-templates" replace /> : <Login setUser={setUser} />} />
        <Route path="/" element={user ? <Navigate to="/saved-templates" replace /> : 
          <>
            <Hero />
            <OurServices />
            <AboutUs/>
            <Footer />
          </>} 
        />
      </Routes>
    </>
  );
}

export default App;
