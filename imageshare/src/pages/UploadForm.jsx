import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import "../index.css";
import axios from 'axios';
import { useAuth } from '../store/auth.jsx';

export function UploadForm() {
  const [photos, setPhotos] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    getPhotos();
  }, [user]);

  // Uploading photos
  const uploadFile = async (data) => {
    try {
      const response = await axios.post("/uploadform/save", data);
      console.log("Uploaded Photo:", response.data);
      // Fetch photos again after successful upload
      getPhotos(); 
    } catch (error) {
      console.error("Error in uploadFile:", error);
    }
  };

  const handleFileChange = async (e) => {
    e.preventDefault();

    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const data = new FormData();
      data.append("photo", selectedFile);
      data.append("owner", user._id);
      await uploadFile(data);
    }
  };

  // Fetching photos
  const getPhotos = async () => {
    try {
      const response = await axios.get("/uploadform/get", {
        withCredentials: true,
      });
      console.log("Fetched Photos:", response.data);
      setPhotos(response.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  return (
    <section className="upload-section">
      <h1>Gallery</h1>
      <div className="gallery-container">
        {photos.length > 0 ? (
          photos.map(({ photo, _id }) => (
            <div key={_id} className="photo-card">
              <img src={`http://localhost:8000/uploads/${photo}`} alt={photo} />
            </div>
          ))
        ) : (
          <p>No photos uploaded yet.</p>
        )}
        <label className="upload-button" htmlFor="file">
          <FiPlus size={24} />
        </label>
        <input hidden type="file" name="file" id="file" onChange={handleFileChange} />
      </div>
    </section>
  );
}
