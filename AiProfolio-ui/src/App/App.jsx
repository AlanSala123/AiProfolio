import { useState } from 'react'
import './App.css'
import Hero from '../Hero/Hero'
import Navbar from '../Navbar/Navbar'
import LandingNavbar from '../LandingNavbar/LandingNavbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Fixed import statement for Route
import Register from '../Register/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <LandingNavbar />
        <Routes>
          <Route path="/Register" element={
            <main>
              <Register />
            </main>
          } />
          <Route path="/" element={
            <main>
              <Hero />
            </main>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
