import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Hero from '../layout/Hero';
import TourBanner from '../layout/TourBanner';
import KeyBenefits from '../layout/KeyBenifits';
import NearTours from '../layout/NearTours';
import TopTours from '../layout/TopTours';
import CheapTours from '../layout/CheapTours';

const Home = () => {

    const [tours, setTours] = useState([]);

    useEffect(() => {

        const getTours = async () => {
            try {
                const res = await fetch('/api/tours/getTours');
                if (!res.ok) {
                    const errorData = await res.json();
                    return toast.error(errorData.message);
                }

                const data = await res.json();
                setTours(data.data.tours);
            } catch (error) {
                toast.error(error.message);
            }
        }
        getTours()
    }, []);

    return (
        <>
            <Hero tours={tours.reverse()} />
            <TourBanner />
            <KeyBenefits />
            <NearTours />
            <TopTours />
            <CheapTours />
        </>
    )
}

export default Home