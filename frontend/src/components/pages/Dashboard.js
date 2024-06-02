import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaHome } from "react-icons/fa";
import { MdTour } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { TbBrandBooking } from "react-icons/tb";
import { MdContacts } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";

const Dashboard = () => {

    const { currentUser } = useSelector(state => state.user);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex">
            <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} role="dialog" aria-modal="true" >
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
                <div className="fixed inset-y-0 left-0 z-50 flex max-w-full">
                    <div className="w-64 bg-gray-800 text-white flex flex-col">
                        <div className="p-4 text-lg font-bold"><MdAdminPanelSettings className='inline mr-4 text-3xl' /> Dashboard</div>
                        <nav className="flex-1">
                            <ul onClick={() => setSidebarOpen(false)}>
                                <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/home" className='flex items-center'><FaHome className='inline mr-4 text-xl' />Home</Link></li>
                                <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/tours" className='flex items-center'><MdTour className='inline mr-4 text-xl' />Tours</Link></li>
                                <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/users" className='flex items-center'><FaUsers className='inline mr-4 text-xl' />Users</Link></li>
                                <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/bookings" className='flex items-center'><TbBrandBooking className='inline mr-4 text-xl' />Customers</Link></li>
                                <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/reviews" className='flex items-center'><MdOutlineRateReview className='inline mr-4 text-xl' />Reviews</Link></li>
                                <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/contacts" className='flex items-center'><MdContacts className='inline mr-4 text-xl' />Contacts</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-gray-800 text-white">
                <div className="p-4 text-lg font-bold flex items-center"><MdAdminPanelSettings className='inline mr-4 text-3xl' /> Dashboard</div>
                <nav className="flex-1">
                    <ul>
                        <li className="px-4 py-2 hover:bg-gray-700 "><Link to="/dashboard/home" className='flex items-center'><FaHome className='inline mr-4 text-xl' />Home</Link></li>
                        <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/tours" className='flex items-center'><MdTour className='inline mr-4 text-xl' />Tours</Link></li>
                        <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/users" className='flex items-center'><FaUsers className='inline mr-4 text-xl' />Users</Link></li>
                        <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/bookings" className='flex items-center'><TbBrandBooking className='inline mr-4 text-xl' />Customers</Link></li>
                        <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/reviews" className='flex items-center'><MdOutlineRateReview className='inline mr-4 text-xl' />Reviews</Link></li>
                        <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/contacts" className='flex items-center'><MdContacts className='inline mr-4 text-xl' />Contacts</Link></li>
                    </ul>
                </nav>
            </aside>

            <div className="flex-1 flex flex-col">
                <div className="w-full bg-white shadow p-4 flex justify-between items-center">
                    <button className="lg:hidden text-gray-500" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                    <p className="text-lg font-bold">Hello {currentUser?.name.split(' ')[0]} 👋</p>
                    {/* <div className="relative">
                        <input type="text" className="bg-gray-100 rounded-full px-4 py-2" placeholder="Search" />
                        <svg className="absolute right-2 top-2 h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 10-14 0 7 7 0 0014 0z"></path>
                        </svg>
                    </div> */}
                </div>
                <div className="flex-1 lg:p-6 p-4 bg-gray-100">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
