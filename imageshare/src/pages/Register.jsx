import React, { useState } from 'react';
import "../index.css";
import {useNavigate} from 'react-router-dom'

export function Register() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    })

    const handleInput = (e) => {
        const { name, value } = e.target;

        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/api/v1/user/register", {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)

            })

            if(response.ok){
                alert("registered succesfully")
                navigate("/login")
            }else{
                alert("invalid credentials")
            }

        } catch (error) {
            console.log("react register error",error);
        }
    }

    return (
        <>
            <section className="register">
                <div className="container-register">
                    <h1 className='common-heading'>Register Now</h1>
                    <p className='common-subheading'>Sign up today and get free storage for your images!</p>
                </div>
                <div className="register-container grid grid-two-cols">
                    <div className="content">
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor="username">Username</label>
                                <input type="text" name='username' id='username' autoComplete='on' placeholder='Enter username'
                                    value={user.username} onChange={handleInput} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="email">Email</label>
                                <input type="email" name='email' id='email' autoComplete='on' placeholder='Enter email'
                                    value={user.email} onChange={handleInput} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' id='password' autoComplete='off' placeholder='Create password'
                                    value={user.password} onChange={handleInput} />
                            </div>
                            <div>
                                <button type='submit' className='btn btn-submit' >Register</button>
                            </div>
                        </form>
                    </div>
                    <div className="form-img">
                        <img src="register.png" alt="Register Illustration" style={{ transform: 'scaleX(-1)' }} />
                    </div>
                </div>
            </section>
        </>
    );
}
