import React from 'react';
import './Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export function Footer() {
    return (
        <footer className="footer">
            <div className="container grid grid-four-cols">
                <div className="footer-column">
                    <h4>About Us</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia, laborum.</p>
                </div>
                <div className="footer-column">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/upload">Upload</a></li>
                        <li><a href="/share">Share</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Contact Us</h4>
                    <p>Email: info@example.com</p>
                    <p>Phone: +123 456 7890</p>
                </div>
                <div className="footer-column">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 imageShare. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
