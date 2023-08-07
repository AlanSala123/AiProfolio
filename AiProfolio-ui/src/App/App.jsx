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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3001/auth/user", {
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
      await axios.post('http://localhost:3001/auth/logout', {}, { withCredentials: true })
      setUser(null);
      if (!location.pathname.startsWith("/public/")){
        navigate('/');
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
