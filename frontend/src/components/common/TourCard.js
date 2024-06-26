import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationPin, MdDateRange } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { IoArrowRedoSharp } from "react-icons/io5";
import StarRatings from 'react-star-ratings';

const CardItem = ({ tours }) => {
    return (
        <div className="flex flex-wrap justify-center gap-8 ">
            {tours.map((tour) =>
                <div className="max-w-[18rem] mt-4 bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg " key={tour.photos[0]}>
                    <img className="w-full h-48 object-cover hover:scale-105 transition-scale duration-300" src={tour.photos[0]} alt="tour" />
                    <p className="font-bold text-xl mb-2 mt-2 truncate px-4">{tour.tourName}</p>
                    <p className="px-4 text-gray-700 text-base line-clamp-2">
                        {tour.tourDescription}
                    </p>
                    <div className='px-4 text-sm mb-2 mt-2 flex justify-between'>
                        <div>
                            <p className=''><span className='text-green-700 font-semibold'>₹{tour.price.toLocaleString('en-IN')}</span> / person</p>
                        </div>
                        <div className=''>
                            <StarRatings
                                rating={tour.ratingsAverage}
                                starRatedColor="gold"
                                starDimension="15px"
                                starSpacing="3px"
                            />
                        </div>
                    </div>
                    <div className='px-4 text-sm mb-2 flex justify-between'>
                        <div className=''>
                            <span className='flex items-center gap-1 font-semibold'><MdLocationPin className='text-red-600 text-lg' /> {tour.location}</span>
                        </div>
                        <div className='text-sm mb-2 flex justify-between'>
                            <span className='flex items-center gap-1 font-semibold'><MdDateRange className='text-lg text-pink-600' />{new Date(tour.departureDate).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        </div>
                    </div>
                    <div className='px-4 text-sm mb-2 flex justify-between'>
                        <div className=''>
                            <span className='flex items-center gap-2 font-semibold'><FaRegClock className='text-lg text-green-600' /> {tour.tourDuration} tour</span>
                        </div>
                        <div className='text-sm mb-2 flex justify-between'>
                            <span className='flex items-center gap-2 font-semibold'><IoIosPeople className='text-lg  text-blue-600' /> {tour.groupSize} People</span>
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
