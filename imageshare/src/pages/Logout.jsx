import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("logout fetched");
        fetch("http://localhost:8000/api/v1/user/logout", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
        .then((res) => {
            if (res.status !== 200) {
                const error = new Error(res.error);
                console.log(error);
            } else {
                navigate("/login");
            }
        })
        .catch((err) => {
            console.log("react logout error", err);
        });
    }, [navigate]); // Empty dependency array to ensure it runs only once

    return (
        <>
            <div>Logout page.....</div>
        </>
    );
};