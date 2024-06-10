import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import AccessDenied from './AccessDenied';

const GuideRoute = () => {
    const { currentUser } = useSelector(state => state.user);

    return (currentUser && currentUser.role === 'guide' ? <Outlet /> : <AccessDenied />)
}

export default GuideRoute;