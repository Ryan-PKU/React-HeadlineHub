import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { setUserInfo } from '@/store/modules/user';
import { useDispatch } from 'react-redux';
import { protectedAPI } from '@/apis/user';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const AuthRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const dispatch = useDispatch()
    useEffect(() => {
        const checkAuth = async () => {
            try {
                await delay(1000)
                const res = await protectedAPI();
                dispatch(setUserInfo(res))
                setIsAuthenticated(true);
            } catch (error) {
                if (error.response) {
                    alert(`Token error code: ${error.response.status}\nMessage: ${error.response.data.message}`);
                } else {
                    alert(`Token error. Error message: ${error.message}`);
                }
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
