import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CardItem from '../common/TourCard';
import { ShimmerThumbnail } from "react-shimmer-effects";
import { BiError } from "react-icons/bi";

const TopTours = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getTopTours = async () => {
            try {
                setError(false);
                setLoading(true);
                const res = await fetch('/api/tours/top-4-tours');
                if (!res.ok) {
                    const errorData = await res.json();
                    setLoading(false);
                    setError(true);
                    return toast.error(errorData.message);
                }
                const data = await res.json();
                setLoading(false);
                setError(false);
                setTours(data.data.tours);
            } catch (error) {
                setError(true);
                setLoading(false);
                toast.error(error.message);
            }
        }

        getTopTours();
    }, []);


    return (
        <div className='flex flex-col flex-wrap justify-center gap-8  mt-28'>
            <h1 className="text-center text-5xl font-bold text-gray-900 mb-8" >Explore Top Rated Tours</h1>
            {
                loading && (
                    <div className='p-4 flex items-center justify-center flex-wrap gap-4'>{Array.from({ length: 5 }).map((_, i) => <ShimmerThumbnail key={i} height={300} width={300} rounded />)}
                    </div>
                )
            }

            {
                !error && tours.length !== 0 && (
                    <CardItem tours={tours} />
                )
            }
            {
                error && (
                    <div className="text-center flex items-center flex-col gap-4">
                        <BiError className='text-red-500 text-4xl text-center mt-8' />
                        <p className="mt-6 text-base leading-7 text-red-600">Couldn't find tours, Please try after sometime.!</p>
                    </div>
                )
            }

        </div>
    )
}

export default TopTours