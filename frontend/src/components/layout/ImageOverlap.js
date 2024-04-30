import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ImageOverlap = ({ photos }) => {
    const { currentUser } = useSelector(state => state.user);
    return (
        <>
            <div className="flex items-center relative">
                <div className="relative z-10 max-sm:w-32 max-sm:h-32 w-64 h-64 rounded-full overflow-hidden">
                    <img
                        src={photos[0]}
                        alt="Avatar 1"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute left-16 max-sm:left-8 top-4 z-20 max-sm:w-32 max-sm:h-32 w-64 h-64 rounded-full overflow-hidden">
                    <img
                        src={photos[1]}
                        alt="Avatar 2"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute left-32 max-sm:left-16 top-8 z-30 max-sm:w-32 max-sm:h-32 w-64 h-64 rounded-full overflow-hidden">
                    <img
                        src={photos[2]}
                        alt="Avatar 3"
                        className="w-full h-full object-cover"

                    />
                </div>

            </div>
            {
                currentUser && (
                    <button className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md max-sm:mt-16">
                        Book Now
                    </button>
                )
            }
            {
                !currentUser && (<Link to='/sign-in' className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md max-sm:mt-16">
                    Log in to book now
                </Link>)
            }
        </>
    );
};

export default ImageOverlap;
