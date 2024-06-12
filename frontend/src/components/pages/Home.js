import React from 'react';
import Hero from '../layout/Hero';
import TourBanner from '../layout/TourBanner';
import KeyBenefits from '../layout/KeyBenifits';
import NearTours from '../layout/NearTours';
import TopTours from '../layout/TopTours';
import CheapTours from '../layout/CheapTours';
import FAQs from '../layout/FAQs';
import ReviewCarousel from '../layout/ReviewCarousel';

import './Tours.css';

const Home = () => {

    return (
        <>
            <Hero />
            <TourBanner />
            <KeyBenefits />
            <NearTours />
            <TopTours />
            <CheapTours />
            <FAQs />
            <ReviewCarousel />
        </>
    )
}

export default Home;