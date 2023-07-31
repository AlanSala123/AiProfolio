import { useEffect, useState } from 'react'
import './App.css'
import Hero from '../Hero/Hero'
import LandingNavbar from '../LandingNavbar/LandingNavbar'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'; 
import Register from '../Register/Register'
import axios from 'axios'
import OurServices from '../OurServices/OurServices'
import Login from '../Login/Login'
import Footer from '../Footer/Footer'
import AboutUs from '../About/About'
import Dashboard from '../SavedTemplates/SavedTemplates'
import PopularTemplates from '../PopularTemplates/PopularTemplates'
import Header from '../Components/Header/Header'
import Skills from '../Components/Skills/Skills'
import Projects from '../Components/Projects/Projects'
import Navbar from '../Components/Navbar/Navbar'
import Create from '../Create/Create';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import Education from '../Components/Education/Education';
import Experience from '../Components/Experiences/Experiences';
import AboutMe from '../Components/AboutMe/AboutMe';


function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [resumeObj, setResumeObj] = useState(null)
  const [templateObj, setTemplateObj] = useState(null)


  const navigate = useNavigate()

  useEffect(() => {

    
    const fetchUser = async () => {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        try {

          const res = await axios.post("http://localhost:3001/auth/login", { token: savedToken });
          const newUser = res?.data?.user;
          const newToken = res?.data?.token;
          
          setUser(newUser);
          setToken(newToken); 
          localStorage.setItem("token", newToken);

      
          if(newToken) { 
            //navigate('/saved-templates');
          }
        } catch (error) {
          console.log(error)
          //handleLogout();
        }
      }
    };
    fetchUser();
  }, []); 
  
  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate('/');
  }
  return (
    <>
        <LandingNavbar  token={token} handleLogout={handleLogout}/>
        <Routes>
          <Route path='/view' element={
            <>
              <Navbar navbar={templateObj?.navbar} data={resumeObj}/>
              <Header header={templateObj?.header} data={resumeObj}/>
              <AboutMe about={templateObj?.about} data={resumeObj}/>
              <Education education={templateObj?.education} educationData={resumeObj?.education}/>
              <Experience experiences={templateObj?.experiences} experienceList={resumeObj?.experiences}/>
              <Skills skills={templateObj?.skills} skillList={resumeObj?.skills}/>
              <Projects projects={templateObj?.projects} projectList={resumeObj?.projects} />
            </>
          }/>
          <Route path="/create" element={
<main>
<Create setResumeObj={setResumeObj} setTemplateObj={setTemplateObj}/>
</main>
} />

          <Route path='/popular-templates' element={
            <main>
            <PopularTemplates user={user} token={token}/>
            </main>
          }/>
          <Route path="/Register" element={
            <main>
              <Register setUser={setUser} setToken={setToken}/>
            </main>
          } />
          <Route path="/Login" element={
            <main>
              <Login setUser={setUser} setToken={setToken}/>
            </main>
          } />
          <Route path="/" element={
            <main>
              <Hero />
              <OurServices />
              <AboutUs/>
              <Footer />
            </main>
          } />
          <Route path="/saved-templates" element={
            <main>
              <Dashboard user={user} token={token}/>
            </main>
          } />
        </Routes>
    </>
  )
}

export default App;
