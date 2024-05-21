import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { request } from '@/utils';
import { setUserInfo } from '@/store/modules/user';
import { useDispatch } from 'react-redux';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const AuthRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const dispatch = useDispatch()
    useEffect(() => {
        const checkAuth = async () => {
            try {
                await delay(1000)
                const res = await request.post('/protected');
                dispatch(setUserInfo(res))
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, [dispatch]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // 可以根据需求展示加载状态
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default AuthRoute;
