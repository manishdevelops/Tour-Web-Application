import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import TourCard from '../common/TourCard';
import { ShimmerThumbnail } from "react-shimmer-effects";
import { useSelector } from 'react-redux';


const MyBookings = () => {
    const { currentUser } = useSelector((state) => state.user);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tourName = queryParams.get('name');
    const tour = queryParams.get('tour');
    const user = queryParams.get('user');
    const price = queryParams.get('price');
    const tourGuide = queryParams.get('guide');

    const [bookedTours, setBookedTours] = useState(null);

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
                body: JSON.stringify({ tourName, tour, tourGuide, user, price, email: currentUser.email })
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
        const func = async () => {
            await bookMyTour();
            await getMyTours();
        }

        func();

    }, []);

    return (
        <>
            <h2 className='text-3xl text-center font-semibold my-7'>My Bookings</h2>
            {bookedTours && <TourCard tours={bookedTours} />}
            {!bookedTours && <div className='p-4 flex items-center justify-center flex-wrap gap-4'>{Array.from({ length: 5 }).map((_, i) => <ShimmerThumbnail key={i} height={250} width={250} rounded />)}
            </div>}
            {
                (bookedTours && bookedTours.length) === 0 && <p className='text-center mt-8 text-xl text-red-500 font-semibold'>No bookings fround!</p>
            }
        </>
    )
}

export default MyBookings;