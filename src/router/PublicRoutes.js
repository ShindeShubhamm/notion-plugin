import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = (props) => {
    return !localStorage.getItem('notion')?.trim() ? (
        <Outlet />
    ) : (
        <Navigate to='/app' />
    );
};

export default PublicRoutes;
