import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Hero from '../layout/Hero';
import TourBanner from '../layout/TourBanner';
import KeyBenefits from '../layout/KeyBenifits';

const Home = () => {

    const [tours, setTours] = useState([]);
    console.log(tours)

    useEffect(() => {

        const getTours = async () => {
            try {
                const res = await fetch('/api/tours/getTours');
                if (!res.ok) {
                    const errorData = await res.json();
                    return toast.error(errorData.message);
                }

                const data = await res.json();
                // const a = data.data.tours.map((tour) => tour.photos[0]);
                setTours(data.data.tours);
            } catch (error) {
                toast.error(error.message);
            }
        }
        getTours()
    }, []);

    return (
        <>
            <Hero tours={tours} />
            <TourBanner />
            <KeyBenefits />
        </>
    )
}

export default Home