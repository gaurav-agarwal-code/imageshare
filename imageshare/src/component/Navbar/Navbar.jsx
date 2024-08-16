import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.css";
import {useAuth} from '../../store/auth.jsx'

export function Navbar() {

    const {user} = useAuth()

    return (
        <>
        <header>
        <div className="container">

            <div className="nav-logo">
                <NavLink to="/" className="logo" style={{ color: '#424242' }} >image<span className='dot'>Home</span></NavLink>
            </div>

            <div className="nav-list">
            <ul>
                <li><NavLink to="/">home</NavLink></li>
                <li><NavLink to="/about">about</NavLink></li>
                <li><NavLink to="/share">share</NavLink></li>
                <li><NavLink to="/upload">upload</NavLink></li>
            </ul>
            </div>

            <div className="nav-form">
            <ul>
            {user ? 
                (   <>
                        <li><NavLink to="/logout">logout</NavLink></li>
                    </>
                ) : (
                    <>
                        <li><NavLink to="/register">register</NavLink></li>
                        <li><NavLink to="/login">login</NavLink></li>
                    </>
                )}
            </ul>
            </div>
            
        </div>
        </header>
        </>
    );
}
