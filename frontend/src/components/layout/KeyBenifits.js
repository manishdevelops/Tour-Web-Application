import React from 'react';
import { IoMdSettings } from "react-icons/io";
import { TbBulb } from "react-icons/tb";
import { MdFileDownloadDone } from "react-icons/md";
import { FaRocket } from "react-icons/fa";

const KeyBenefits = () => {
    return (
        <div className="container mx-auto">
            <h1 className="text-center text-3xl font-bold mb-8 text-gray-900" >Key Benefits</h1>
            <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 text-center text-sm">
                <div className="flex flex-col items-center rounded-lg shadow-md p-8 m-4">
                    <IoMdSettings className='text-3xl text-blue-600' />
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Local Insights</h3>
                    <p className="text-gray-700 text-sm">
                        Authentic local experiences that connect you with the heart and soul of the destination.
                    </p>
                </div>
                <div className="flex flex-col items-center rounded-lg shadow-md p-8 m-4">
                    <TbBulb className='text-3xl text-blue-600' />
                    <h3 className="text-xl font-bold mb-2 text-gray-900 ">Tailored Plans</h3>
                    <p className="text-gray-700 text-sm">
                        Our expertise your preferences the perfect travel plan, crafted just for you.
                    </p>
                </div>
                <div className="flex flex-col items-center rounded-lg shadow-md p-8 m-4">
                    <MdFileDownloadDone className='text-3xl text-blue-600' />
                    <h3 className="text-xl font-bold mb-2 text-gray-900">VIP Access</h3>
                    <p className="text-gray-700 text-sm">
                        Gain special access to hidden gems and exclusive events, enhancing your travel experience.
                    </p>
                </div>
                <div className="flex flex-col items-center rounded-lg shadow-md p-8 m-4">
                    <FaRocket className='text-3xl text-blue-600' />
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Eco-Friendly</h3>
                    <p className="text-gray-700 text-sm">
                        Contribute to conservation efforts while enjoying your travel, leaving a positive impact.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default KeyBenefits;