import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = (props) => {
    return !!localStorage.getItem('notion')?.trim() ? (
        <Outlet />
    ) : (
        <Navigate to='/' />
    );
};

export default PrivateRoutes;
