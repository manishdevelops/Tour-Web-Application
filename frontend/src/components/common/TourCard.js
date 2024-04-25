import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationPin } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { IoArrowRedoSharp } from "react-icons/io5";

const CardItem = ({ tours }) => {
    return (
        <div className="flex flex-wrap justify-center gap-8">
            {tours.map((tour) =>
                <div className="max-w-xs mt-4 bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg max-sm:px-4" key={tour.photos[0]}>
                    <img className="w-full h-48 object-cover hover:scale-105 transition-scale duration-300" src={tour.photos[0]} alt="tour" />
                    <p className="font-bold text-xl mb-2 mt-2 truncate px-4">{tour.tourName}</p>
                    <p className="px-4 text-gray-700 text-base line-clamp-2">
                        {tour.tourDescription}
                    </p>
                    <div className='px-4 text-sm mb-2 mt-2 flex justify-between'>
                        <div>
                            <span className=''>₹{tour.price} per person</span>
                        </div>
                        <div className=''>
                            <span className=''>Ratings: </span>
                            <span className=''>{tour.ratings}</span>
                        </div>
                    </div>
                    <div className='px-4 text-sm mb-2 flex justify-between'>
                        <div className=''>
                            <span className='flex items-center gap-1'><MdLocationPin /> {tour.location}</span>
                        </div>
                        <div className='text-sm mb-2 flex justify-between'>
                            <span className='flex items-center gap-1'><MdDateRange />{new Date(tour.departureDate).toLocaleString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                        </div>
                    </div>
                    <div className='px-4 text-sm mb-2 flex justify-between'>
                        <div className=''>
                            <span className='flex items-center gap-2'><FaRegClock /> {tour.tourDuration} tour</span>
                        </div>
                        <div className='text-sm mb-2 flex justify-between'>
                            <span className='flex items-center gap-2'><IoIosPeople /> {tour.groupSize} People</span>
                        </div>
                    </div>
                    <div className='flex justify-end mb-3 px-4'>
                        <Link to={`/tour-overview/${tour.slug}`} className='bg-slate-300 px-4 py-2 rounded-2xl flex items-center gap-2 text-green-800'>Details<IoArrowRedoSharp /></Link>
                    </div>
                </div>
            )}
        </div >
    );
};

export default CardItem;
