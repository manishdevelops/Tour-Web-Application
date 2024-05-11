import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {


    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
                        <p className="text-gray-700 mb-4">
                            We are committed to protecting your privacy. This privacy policy explains how we collect, use, and protect
                            your personal information.
                        </p>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Information Collection</h2>
                        <p className="text-gray-700 mb-4">
                            We collect personal information (such as name, email, phone number) when you register, book tours, or
                            interact with our website.
                        </p>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Use of Information</h2>
                        <p className="text-gray-700 mb-4">
                            We use collected information to process bookings, personalize user experience, and send promotional emails
                            with user consent.
                        </p>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Data Security</h2>
                        <p className="text-gray-700 mb-4">
                            We employ security measures (encryption, secure servers) to protect user data. Information is stored
                            securely and access is restricted.
                        </p>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Sharing and Disclosure</h2>
                        <p className="text-gray-700 mb-4">
                            Personal data may be shared with third parties (tour operators, payment processors) for booking purposes.
                            We do not sell user data.
                        </p>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">User Rights</h2>
                        <p className="text-gray-700 mb-4">
                            You have the right to access, rectify, and delete your personal data. Contact us for data-related
                            inquiries or requests.
                        </p>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Cookies and Tracking</h2>
                        <p className="text-gray-700 mb-4">
                            We use cookies for website functionality and analytics. By using our website, you consent to our use of
                            cookies.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <Link
                                to='/contact-us'
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
                            >
                                Go Back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
