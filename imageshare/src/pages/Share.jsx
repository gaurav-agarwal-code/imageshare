import axios from 'axios';
import React, { useState } from 'react';

export function Share(props) {
    const [file, setFile] = useState('');
    const [result, setResult] = useState('');

    const uploadFile = async (data) => {
        try {
            const response = await axios.post("/share", data);
            return response.data;
        } catch (error) {
            console.log("Error in share react:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select a file first.");
            return;
        }

        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response);
    };

    return (
        <>
        <section className="share-section">
        <div className="container-share">
            <h1 className="share-heading">Share</h1>
            <p className="share-subheading">Select an image or file to share</p>
        </div>
        <div className="share-container grid grid-two-cols">
            <div className="share-content">
                <form className="share-form" onSubmit={handleSubmit}>
                    <div className="file-input-container">
                        {result && <a href={result} target="_blank" rel="noopener noreferrer">{result}</a>}
                    </div>
                    <div className="file-input-container">
                        <label htmlFor="fileInput">Choose file to upload</label>
                        <input
                            type="file"
                            id="fileInput"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-submit">Share</button>
                    </div>
                </form>
            </div>
            <div className="form-img">
                <img src="share.png" alt="Share Illustration" />
            </div>
        </div>
        </section>
        </>
    );
}
