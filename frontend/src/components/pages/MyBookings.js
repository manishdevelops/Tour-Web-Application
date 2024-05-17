import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import TourCard from '../common/TourCard';
import { ShimmerThumbnail } from "react-shimmer-effects";


const MyBookings = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tour = queryParams.get('tour');
    const user = queryParams.get('user');
    const price = queryParams.get('price');
    console.log(tour, user, price);

    const [bookedTours, setBookedTours] = useState(null);
    console.log(bookedTours);

    const getMyTours = async () => {
        try {
            const res = await fetch('/api/bookings/my-tours');

            if (!res.ok) {
                const errorData = await res.json();
                return toast.error(errorData.message);
            }

            const data = await res.json();
            setBookedTours(data.tours);
        } catch (error) {
            toast.error(error.message);
        }
    }

    const bookMyTour = async () => {
        try {
            if (!tour && !user && !price) {
                return;
            };
            const res = await fetch('/api/bookings/book-tour', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tour, user, price })
            });

            if (!res.ok) {
                const errorData = await res.json();
                return toast.error(errorData.message);
            }
            toast.success('Tour booked successfully!');
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        bookMyTour();
        getMyTours();
    }, []);

    return (
        <>
            <h2 className='text-3xl text-center font-semibold my-7'>MyBookings</h2>
            {bookedTours && <TourCard tours={bookedTours} />}
            {!bookedTours && <div className='p-4 flex items-center justify-center flex-wrap gap-4'>{Array.from({ length: 5 }).map((_, i) => <ShimmerThumbnail key={i} height={250} width={250} rounded />)}
            </div>}
        </>
    )
}

export default MyBookings;