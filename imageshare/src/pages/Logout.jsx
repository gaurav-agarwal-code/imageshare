import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/v1/user/logout", {
                    method: "POST",
                    credentials: "include",
                });

                if (response.ok) {
                    // Successfully logged out
                    localStorage.removeItem("isLoggedIn");
                    alert("Logged out successfully");
                    navigate('/login'); // Redirect to login or home page
                } else {
                    // Handle logout failure
                    alert("Failed to log out");
                }
            } catch (error) {
                console.log("Logout error:", error);
                alert("An error occurred during logout");
            }
        };

        logoutUser();
    }, [navigate]);

    return <div>Logging out...</div>;
};

export default Logout;
