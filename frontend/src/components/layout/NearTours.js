import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BiError } from "react-icons/bi";
import CardItem from '../common/TourCard';
import { ShimmerThumbnail } from "react-shimmer-effects";


const NearTours = () => {

    const [error, setError] = useState(null);
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(false);

    const getNearbyTours = async (lat, lng) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/tours/tours-within/250/center/${lat},${lng}/unit/mi`);

            if (!res.ok) {
                const errorData = await res.json();
                setLoading(false);

                return toast.error(errorData.message);
            }
            const data = await res.json();
            setLoading(false);
            setTours(data.data.data);
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if ('geolocation' in navigator) {
            // Get current position (latitude and longitude)
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    getNearbyTours(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    setError(error.message);
                    console.error('Error getting geolocation:', error);
                }
            );

        } else {
            setError('Geolocation is not supported by this browser.');
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);


    return (
        <div className='flex flex-wrap justify-center gap-8  mt-28'>
            <h1 className="text-center text-5xl font-bold text-gray-900 mb-8" >Explore Tours Around You</h1>
            {
                error && (
                    <div className="text-center flex items-center flex-col gap-4">
                        <BiError className='text-red-500 text-4xl text-center mt-8' />
                        <p className="mt-6 text-base leading-7 text-red-600">Couldn't find Nearby tours,   {error}</p>
                    </div>
                )
            }

            {
                !error && tours.length !== 0 && (
                    <CardItem tours={tours} />
                )
            }
            {
                loading && (
                    <div className='p-4 flex items-center justify-center flex-wrap gap-4'>{Array.from({ length: 5 }).map((_, i) => <ShimmerThumbnail key={i} height={300} width={300} rounded />)}
                    </div>
                )
            }

        </div>
    )
}

export default NearTours;