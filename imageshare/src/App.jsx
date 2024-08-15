import { useState } from 'react'
import {BrowserRouter, Routes , Route} from "react-router-dom"
import { Navbar } from './component/Navbar/Navbar.jsx'
import {Home} from "./pages/Home.jsx"
import {Share} from "./pages/Share.jsx"
import {Register} from "./pages/Register.jsx"
import {Login} from "./pages/Login.jsx"
import { About } from './pages/About.jsx'
import { Footer } from './component/Footer/Footer.jsx'
import { Error } from './pages/Error.jsx'
import {Logout} from './pages/Logout.jsx'
import { Contact } from './pages/Contact.jsx'

function App() {

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/share" element={<Share />} />
        <Route path="/upload" element={<Share />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error />} />
      </Routes>
    <Footer />
    </ BrowserRouter>
  )
}

export default App
