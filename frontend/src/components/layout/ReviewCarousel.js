import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ReviewCarouselCard from '../common/ReviewCarouselCard';

const ReviewCarousel = () => {
    const [reviews, setReviews] = useState([]);
    console.log(reviews);

    const getReviews = async () => {
        try {
            const res = await fetch('/api/reviews');
            if (!res.ok) {
                const errorData = res.json();
                return toast.error(errorData.message);
            }
            const data = await res.json();
            setReviews(data.data);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {

        getReviews();

    }, []);

    return (
        <div className="max-w-lg mx-auto flex flex-col justify-center items-center my-16">
            <h2 className='text-center text-5xl font-bold text-gray-900 mb-8'>Customer Love</h2>
            {reviews.length !== 0 && <ReviewCarouselCard reviews={reviews} />}
        </div>
    );
};

export default ReviewCarousel;
