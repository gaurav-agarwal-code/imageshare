import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from './component/Navbar/Navbar.jsx';
import { Home } from "./pages/Home.jsx";
import { Share } from "./pages/Share.jsx";
import { Register } from "./pages/Register.jsx";
import { Login } from "./pages/Login.jsx";
import { About } from './pages/About.jsx';
import { Footer } from './component/Footer/Footer.jsx';
import { Error } from './pages/Error.jsx';
import { Logout } from './pages/Logout.jsx';
import { Contact } from './pages/Contact.jsx';
import { Upload } from './pages/Upload.jsx';
import { UploadForm } from './pages/UploadForm.jsx';
import { useAuth } from './store/auth.jsx';
import axios from 'axios';


function App() {
  const [photos, setPhotos] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // if (!user) return;

    const getPhotos = async () => {
      try {
        const response = await axios.get("/uploadform/get", {
          withCredentials: true,
        });
        
        console.log(response.data);
        setPhotos(response.data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    getPhotos();
  }, [user]);


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/share" element={<Share />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/uploadform" element={<UploadForm photos={photos} />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
