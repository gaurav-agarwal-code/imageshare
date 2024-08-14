import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const response = await axios.post("/logout", null, {
          withCredentials: true,
        });

        console.log("Logout response:", response);

        if (response.status === 200) {
          console.log("Logout successful");
          navigate('/login');
        } else {
          console.error("Failed to log out. Status:", response.status);
        }
      } catch (error) {
        console.error("Logout error:", error.response?.data || error.message);
        if (error.response?.status === 401) {
          console.log("Token might be missing or invalid. Redirecting to login.");
        }
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <h1>Logging out...</h1>
  );
};
