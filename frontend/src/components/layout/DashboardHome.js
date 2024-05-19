import React from 'react'

const DashboardHome = () => {
    return (
        <div className="flex-1 p-8 bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-gray-600">Total Customers</h2>
                    <div className="text-2xl font-bold">5,423</div>
                    <div className="text-green-500">16% this month</div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-gray-600">Members</h2>
                    <div className="text-2xl font-bold">1,893</div>
                    <div className="text-red-500">1% this month</div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-gray-600">Active Now</h2>
                    <div className="text-2xl font-bold">189</div>
                    <div className="flex mt-2">
                        <img src="https://via.placeholder.com/20" alt="User" className="rounded-full w-6 h-6 mr-1" />
                        <img src="https://via.placeholder.com/20" alt="User" className="rounded-full w-6 h-6 mr-1" />
                        <img src="https://via.placeholder.com/20" alt="User" className="rounded-full w-6 h-6 mr-1" />
                        <img src="https://via.placeholder.com/20" alt="User" className="rounded-full w-6 h-6 mr-1" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardHome;