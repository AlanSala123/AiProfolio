import { useState } from 'react'
import './App.css'
import Hero from '../Hero/Hero'
import Navbar from '../Navbar/Navbar'
import LandingNavbar from '../LandingNavbar/LandingNavbar'
import { BrowserRouter as Route, BrowserRouter, Routes } from 'react-router-dom';
import Register from '../Register/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LandingNavbar />
      <Hero />

    </>
  )
}

export default App
