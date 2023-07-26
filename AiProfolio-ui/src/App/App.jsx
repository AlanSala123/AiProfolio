import { useEffect, useState } from 'react'
import './App.css'
import Hero from '../Hero/Hero'
import LandingNavbar from '../LandingNavbar/LandingNavbar'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'; 
import Register from '../Register/Register'
import axios from 'axios'
import OurServices from '../OurServices/OurServices'
import Login from '../Login/Login'
import ContactUs from '../Contact/Contact'
import Footer from '../Footer/Footer'
import AboutUs from '../About/About'
import Dashboard from '../SavedTemplates/SavedTemplates'
import PopularTemplates from '../PopularTemplates/PopularTemplates'
import Header from '../Components/Header/Header'
import Skills from '../Components/Skills/Skills'
import Projects from '../Components/Projects/Projects'
import Navbar from '../Components/Navbar/Navbar'
import Dropzone from '../DragDrop/DragDrop';


function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [portfolio, setPortfolio] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        try {
          const res2 = await axios.get('http://localhost:3001/product/view')
          setPortfolio(res2?.data?.portfolio)
          const res = await axios.post("http://localhost:3001/auth/login", { token: savedToken });
          const newUser = res?.data?.user;
          const newToken = res?.data?.token;
          
          setUser(newUser);
          setToken(newToken); 
          localStorage.setItem("token", newToken);
          console.log("PORTFOLIO", portfolio.header)
      
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

            <div>
              <Navbar navbar={portfolio?.navbar}/>
              <Header header={portfolio?.header}/>
              <Skills skills={portfolio?.skills}/>
              <Projects projects={portfolio?.projects} />
            </div>

          }/>
          <Route path="/Drag-Drop" element={
<main>
<Dropzone/>
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
              <ContactUs/>
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
