import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import AccessDenied from './AccessDenied';

const AdminRoute = () => {
    const { currentUser } = useSelector(state => state.user);

    return (currentUser.role === 'admin' ? <Outlet /> : <AccessDenied />)
}

export default AdminRoute