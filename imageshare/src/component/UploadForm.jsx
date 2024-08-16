import React from 'react';

export function UploadForm(props) {
    return (
        <>
            <section className="upload-section">
                <div className="container-upload">
                    <h1 className='upload-heading'>Share Your File</h1>
                    <p className='upload-subheading'>Select an image or file to share</p>
                </div>
                <div className="upload-container grid grid-two-cols">
                    <div className="upload-content">
                        <form className="upload-form">
                            <div className='file-input-container'>
                                <label htmlFor="fileInput">Choose file to upload</label>
                                <input type="file" id='fileInput' />
                            </div>
                            <div>
                                <button type='submit' className='btn btn-submit'>Upload</button>
                            </div>
                        </form>
                    </div>
                    <div className="form-img">
                        <img src="login.png" alt="Upload Illustration" />
                    </div>
                </div>
            </section>
        </>
    )
}
