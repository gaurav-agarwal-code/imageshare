import React, { useEffect } from 'react';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';

export function Upload(props) {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/UploadForm");
        } else {
            navigate("/login");
        }
    }, [user, navigate]);

    return null;
}
