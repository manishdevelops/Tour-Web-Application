import React from 'react';
import { Link } from 'react-router-dom';

const AccessDenied = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
                <p className="mt-4 text-gray-600">
                    You do not have the necessary permissions to access this page.
                </p>
                <div className="mt-6">
                    <Link
                        to="/home"
                        className="inline-block px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-500"
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AccessDenied;
