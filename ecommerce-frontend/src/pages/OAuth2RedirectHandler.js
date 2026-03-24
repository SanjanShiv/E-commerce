import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');

        if (token) {
            // Decodes JWT locally (minimal manual parsing just for payload) to construct basic user structure
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const payload = JSON.parse(jsonPayload);

            const user = {
                accessToken: token,
                username: payload.sub,
                roles: ["ROLE_USER"] // Defaulting to user role for SSO
            };

            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = '/'; // Hard reload to establish session globally
        } else {
            navigate('/login');
        }
    }, [location, navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <p>Authenticating...</p>
        </div>
    );
};

export default OAuth2RedirectHandler;
