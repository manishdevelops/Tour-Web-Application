import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <Link to='/'>
                    <p className='text-white font-bold text-lg'>Tour<span className='text-gray-500'>Guru</span></p>
                </Link>
                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <Link to="/home" className="hover:underline me-4 md:me-6">Home</Link>
                    </li>
                    <li>
                        <Link to="/tours" className="hover:underline me-4 md:me-6">Tours</Link>
                    </li>

                    <li>
                        <Link to="/contact-us" className="hover:underline me-4 md:me-6">Contact Us</Link>
                    </li>
                    <li>
                        <Link to="/about-us" className="hover:underline">About Us</Link>
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 TourGuru™. All Rights Reserved.</span>
        </div>


    )
}

export default Footer;