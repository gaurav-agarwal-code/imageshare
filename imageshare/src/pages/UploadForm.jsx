import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import "../index.css";
import axios from 'axios';

export function UploadForm({ photos = [], userId }) {

  const uploadFile = async (data) => {
    try {
      const response = await axios.post("/uploadform/save", data);
      console.log(response.data);
    } catch (error) {
      console.error("Error in uploadFile:", error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const data = new FormData();
      data.append("name", selectedFile.name);
      data.append("photo", selectedFile);
      data.append("owner", userId);
      console.log(data);
      uploadFile(data);
    }
  };

  return (
    <>
      <section className="upload-section">
        <h1>Gallery</h1>
        <div className="gallery-container">
          {photos.length > 0 ? (
            photos.map((photo, index) => (
              <div key={index} className="photo-card">
                <img src={photo.url} alt="photo-for-gallery" />
              </div>
            ))
          ) : (
            <p>No photos uploaded yet.</p>
          )}
          <label className="upload-button" htmlFor="file"><FiPlus size={24} /></label>
          <input hidden type="file" name="file" id="file" onChange={handleFileChange}
          />
        </div>
      </section>
    </>
  );
}
