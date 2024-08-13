import React, {useState} from 'react';
import "../index.css";
import { useNavigate } from 'react-router-dom';

export function Login(props) {
    const [user, setUser] = useState({
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

    const handleSubmit = async (e) =>{
        e.preventDefault();
        // console.log("user:  ",JSON.stringify(user));
    
        try {
            const response = await fetch("http://localhost:8000/api/v1/user/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(user)
            })
    
            if(response.ok){
                // Store login state in localStorage
                localStorage.setItem("isLoggedIn", "true");
                alert("login successfully")
                navigate("/")
            } else {
                alert("invalid credentials")
            }
        } catch (error) {
            console.log("react login error", error);
        }
    }
        

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
                                <label htmlFor="username">Username/Email</label>
                                <input type="text" name='username' id='username' autoComplete='on' placeholder='Enter username or email'
                                value={user.username} onChange={handleInput} />
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
