import React from 'react';
import { Outlet } from 'react-router-dom'; 
import SideNav from '../pages/Shared/SideNav/SideNav';

const Dashboard = () => {
    return (
        <div className="flex bg-gray-800">
            <SideNav/>
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;