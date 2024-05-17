import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CardItem from '../common/TourCard';
import { ShimmerThumbnail } from "react-shimmer-effects";

const TopTours = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(false);
    // console.log(tours);

    useEffect(() => {
        const getTopTours = async () => {
            try {
                setLoading(true);
                const res = await fetch('/api/tours/top-4-tours');
                if (!res.ok) {
                    const errorData = await res.json();
                    setLoading(false);
                    return toast.error(errorData.message);
                }
                const data = await res.json();
                setLoading(false);
                setTours(data.data.tours);
            } catch (error) {
                setLoading(false);
                toast.error(error.message);
            }
        }

        getTopTours();
    }, []);


    return (
        <div className='flex flex-wrap justify-center gap-8  mt-28'>
            <h1 className="text-center text-5xl font-bold text-gray-900 mb-8" >Explore Top Rated Tours</h1>
            {
                loading && (
                    <div className='p-4 flex items-center justify-center flex-wrap gap-4'>{Array.from({ length: 5 }).map((_, i) => <ShimmerThumbnail key={i} height={300} width={300} rounded />)}
                    </div>
                )
            }

            {
                tours.length !== 0 && (
                    <CardItem tours={tours} />
                )
            }

        </div>
    )
}

export default TopTours