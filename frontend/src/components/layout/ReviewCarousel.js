import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ReviewCarouselCard from '../common/ReviewCarouselCard';
import { BiError } from "react-icons/bi";

const ReviewCarousel = () => {
    const [reviews, setReviews] = useState([]);
    // console.log(reviews);
    const [error, setError] = useState(false);

    const getReviews = async () => {
        try {
            setError(false);
            const res = await fetch('/api/reviews');
            if (!res.ok) {
                setError(true);
                const errorData = res.json();
                return toast.error(errorData.message);
            }
            const data = await res.json();
            setError(false);
            setReviews(data.data);
        } catch (error) {
            setError(true);
            return toast.error(error.message);
        }

    }

    useEffect(() => {

        getReviews();

    }, []);

    return (
        <div className="max-w-lg mx-auto flex flex-col justify-center items-center my-16">
            <h2 className='text-center text-5xl font-bold text-gray-900 mb-8'>Customer Love</h2>
            {reviews.length !== 0 && <ReviewCarouselCard reviews={reviews} />}
            {
                error && (
                    <div className="text-center flex items-center flex-col gap-4">
                        <BiError className='text-red-500 text-4xl text-center mt-8' />
                        <p className="mt-6 text-base leading-7 text-red-600">Couldn't find Reviews,   {error}</p>
                    </div>
                )
            }
            {
                !error && reviews.length === 0 && <p className='text-center mt-8 text-xl text-red-500 font-semibold'>No reviews yet!</p>
            }
        </div>
    );
};

export default ReviewCarousel;
