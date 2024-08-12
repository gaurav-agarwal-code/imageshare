import React from 'react';
import { NavLink } from 'react-router-dom';
import "../index.css";

export function About() {
    return (
        <>
            <section className="section-about">
                <div className="container-about" style={{ padding: '9.2rem' }}>
                    <h2 className="common-heading">About ImageShare</h2>
                    <p className="common-subheading">
                        ImageShare is a platform designed to simplify the way you store and share your images. Whether you’re looking to securely store your photos online or share a special moment with friends, ImageShare provides a seamless and user-friendly experience.
                    </p>
                </div>
                <div className="container grid grid-three-cols">
                    <div className="div-about">
                        <div className="icon">
                            <img src="Upload (AI style).png" alt="Upload Icon" />
                        </div>
                        <div className="section-common-title">
                            <h5>Upload</h5>
                        </div>
                        <p className='common-subheading'>
                            Upload your images quickly and securely. Enjoy peace of mind knowing your photos are stored safely in the cloud.
                        </p>
                    </div>

                    <div className="div-about">
                        <div className="icon">
                            <img src="copy.png" alt="Copy Link Icon" />
                        </div>
                        <div className="section-common-title">
                            <h5>Copy Link</h5>
                        </div>
                        <p className='common-subheading'>
                            Generate shareable links for your uploaded images. Easily share your favorite moments with friends and family.
                        </p>
                    </div>
                     
                    <div className="div-about">
                        <div className="icon">
                            <img src="share.png" alt="Share Icon" />
                        </div>
                        <div className="section-common-title">
                            <h5>Share</h5>
                        </div>
                        <p className='common-subheading'>
                            Share your images instantly through social media or direct links. Connect and share with your loved ones effortlessly.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
