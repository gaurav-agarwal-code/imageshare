import React from 'react';
import '../index.css';

export function Upload(props) {
    return (
        <>
            <section className="upload">
                <div className="container-upload">
                    <h1 className='common-heading'>Upload Your Images</h1>
                    <p className='common-subheading'>Securely upload and store your images in the cloud.</p>
                </div>
                <div className="upload-container grid grid-two-cols">
                    <div className="content">
                        <form>
                            <div className='mb-3'>
                                <label htmlFor="file-upload">Choose File</label>
                                <input type="file" name='file-upload' id='file-upload' />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="description">Description</label>
                                <textarea name='description' id='description' placeholder='Add a description (optional)' />
                            </div>
                            <div>
                                <button type='submit' className='btn btn-submit'>Upload</button>
                            </div>
                        </form>
                    </div>
                    <div className="form-img">
                        <img src="upload.png" alt="Upload Illustration" />
                    </div>
                </div>
            </section>
        </>
    );
}
