import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { request } from '@/utils';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const AuthRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await delay(1000)
                await request.post('/protected');
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // 可以根据需求展示加载状态
    }

    return isAuthenticated ? children : <Navigate to="/login" replace/>;
};

export default AuthRoute;
