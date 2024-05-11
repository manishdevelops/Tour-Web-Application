import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CardItem from '../common/TourCard';
import { ShimmerThumbnail } from "react-shimmer-effects";


const CheapTours = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const getCheapTours = async () => {
            try {
                setLoading(true);
                const res = await fetch('/api/tours/cheap-4-tours');
                if (!res.ok) {
                    const errorData = await res.json();
                    setLoading(false);
                    return toast.error(errorData.message);
                }
                const data = await res.json();
                console.log(data)
                setLoading(false);
                setTours(data.data.tours);
            } catch (error) {
                setLoading(false);
                toast.error(error.message);
            }
        };

        getCheapTours();
    }, []);


    return (
        <div className='flex flex-wrap justify-center gap-8  my-28'>
            <h1 className="text-center text-5xl font-bold text-gray-900 mb-8" >Budget-Friendly Destinations</h1>
            {
                loading && (
                    <div className='p-4 flex items-center justify-center flex-wrap gap-4'>{Array.from({ length: 4 }).map((_, i) => <ShimmerThumbnail key={i} height={300} width={300} rounded />)}
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

export default CheapTours