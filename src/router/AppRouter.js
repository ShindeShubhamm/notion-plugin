import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from 'components/Login';
import Spreadsheet from 'components/Spreadsheet';
import PrivateRoutes from './PrivateRoutes';
import Layout from 'components/layouts/Layout';
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
                    <Route exact path='/app' element={<Spreadsheet />} />
                </Route>
            </Route>
            <Route element={<PublicRoutes />}>
                <Route exact path='/' element={<Login />} />
            </Route>

            {/* Handle not found route */}
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    );
};

export default AppRouter;
