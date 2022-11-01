import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = (props) => {
    return !localStorage.getItem('code')?.trim() ? (
        <Outlet />
    ) : (
        <Navigate to='/' />
    );
};

export default PublicRoutes;
