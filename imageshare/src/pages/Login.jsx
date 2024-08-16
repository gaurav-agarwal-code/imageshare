import React, {useState} from 'react';
import "../index.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export function Login() {
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: "",
    })

    const handleInput = (e) => {
        const { name, value } = e.target;

        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("user:  ", JSON.stringify(user));
        
        try {
            const response = await axios.post("/login", user, {
                withCredentials: true
            });
    
            if (response.status === 200) {
                alert("Login successful");
                navigate("/");
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.log("React login error", error);
            alert("Login failed. Please check your credentials and try again.");
        }
    };    
        
    return (
        <>
            <section className="register">
                <div className="container-register">
                    <h1 className='common-heading'>Login</h1>
                    <p className='common-subheading'>Log in to access your online storage and share images effortlessly.</p>
                </div>
                <div className="register-container grid grid-two-cols">
                    <div className="content">
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor="username">Enter Username or email</label>
                                <input type="text" name='username' id='username' autoComplete='on' placeholder='Enter username'
                                value={user.username} onChange={handleInput} />
                            </div>
                            <div className='mb-3'>
                                {/* <label htmlFor="email">Email</label> */}
                                <input type="email" name='email' id='email' autoComplete='on' placeholder='Enter email'
                                value={user.email} onChange={handleInput} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' id='password' autoComplete='off' placeholder='Enter password'
                                value={user.password} onChange={handleInput} />
                            </div>
                            <div>
                                <button type='submit' className='btn btn-submit'>Login</button>
                            </div>
                        </form>
                    </div>
                    <div className="form-img">
                        <img src="login.png" alt="Login Illustration" />
                    </div>
                </div>
            </section>
        </>
    );
}
