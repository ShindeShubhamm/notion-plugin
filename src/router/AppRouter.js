import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from 'components/Login';
import Spreadsheet from 'components/Spreadsheet';
import PrivateRoutes from './PrivateRoutes';
import Layout from 'components/layouts/Layout';
import AuthLayout from 'components/layouts/AuthLayout';
import PublicRoutes from './PublicRoutes';

const AppRouter = (props) => {
    return (
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route
                    element={
                        <Layout>
                            <Outlet />
                        </Layout>
                    }
                >
                    <Route exact path='/' element={<Spreadsheet />} />
                </Route>
            </Route>
            <Route element={<PublicRoutes />}>
                <Route
                    element={
                        <AuthLayout>
                            <Outlet />
                        </AuthLayout>
                    }
                >
                    <Route exact path='/auth' element={<Login />} />
                </Route>
            </Route>

            {/* Handle not found route */}
            <Route path='*' element={<Navigate to='/auth' />} />
        </Routes>
    );
};

export default AppRouter;
