import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex">
            <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} role="dialog" aria-modal="true" onClick={() => setSidebarOpen(false)}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" ></div>
                <div className="fixed inset-y-0 left-0 z-50 flex max-w-full">
                    <div className="w-64 bg-gray-800 text-white flex flex-col">
                        <div className="p-4 text-lg font-bold">Dashboard</div>
                        <nav className="flex-1">
                            <ul>
                                <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/home">Home</Link></li>
                                <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/destinations">Tours</Link></li>
                                <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/users">Users</Link></li>
                                <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/bookings">bookings</Link></li>
                                <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/reviews">Reviews</Link></li>
                                <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/contacts">Contacts</Link></li>
                            </ul>
                        </nav>

                        <div className="p-4 border-t border-gray-700">
                            <div className="flex items-center">
                                <img src="https://via.placeholder.com/40" alt="User" className="rounded-full w-10 h-10 mr-2" />
                                <div>
                                    <div className="font-bold">Evano</div>
                                    <div className="text-sm text-gray-400">Project Manager</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-gray-800 text-white">
                <div className="p-4 text-lg font-bold">Dashboard</div>
                <nav className="flex-1">
                    <ul>
                        <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/home">Home</Link></li>
                        <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/tours">Tours</Link></li>
                        <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/users">Users</Link></li>
                        <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/bookings">bookings</Link></li>
                        <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/reviews">Reviews</Link></li>
                        <li className="px-4 py-2 hover:bg-gray-700"><Link to="/dashboard/contacts">Contacts</Link></li>
                    </ul>
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <div className="flex items-center">
                        <img src="https://via.placeholder.com/40" alt="User" className="rounded-full w-10 h-10 mr-2" />
                        <div>
                            <div className="font-bold">Evano</div>
                            <div className="text-sm text-gray-400">Project Manager</div>
                        </div>
                    </div>
                </div>
            </aside>

            <div className="flex-1 flex flex-col">
                <div className="w-full bg-white shadow p-4 flex justify-between items-center">
                    <button className="lg:hidden text-gray-500" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                    <div className="text-lg font-bold">Hello Evano 👋</div>
                    {/* <div className="relative">
                        <input type="text" className="bg-gray-100 rounded-full px-4 py-2" placeholder="Search" />
                        <svg className="absolute right-2 top-2 h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 10-14 0 7 7 0 0014 0z"></path>
                        </svg>
                    </div> */}
                </div>
                <div className="flex-1 p-8 bg-gray-100">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
