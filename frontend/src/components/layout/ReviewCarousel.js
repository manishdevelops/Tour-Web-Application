import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ReviewCarouselCard from '../common/ReviewCarouselCard';
import { BiError } from "react-icons/bi";
import { ShimmerThumbnail } from "react-shimmer-effects";


const ReviewCarousel = () => {
    const [reviews, setReviews] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    console.log(reviews);

    const getReviews = async () => {
        try {
            setError(false);
            setLoading(true);
            const res = await fetch('/api/reviews');
            if (!res.ok) {
                setError(true);
                setLoading(false);
                const errorData = res.json();
                return toast.error(errorData.message);
            }
            const data = await res.json();
            setError(false);
            setLoading(false);
            setReviews(data.data);
        } catch (error) {
            setLoading(true);
            setError(false);
            return toast.error(error.message);
        }
    }

    useEffect(() => {

        getReviews();

    }, []);

    return (
        <div className="max-w-lg mx-auto flex flex-col justify-center items-center my-16">
            <h2 className='text-center text-5xl font-bold text-gray-900 mb-8'>Customer Love</h2>

            {
                reviews && reviews.length !== 0 && <ReviewCarouselCard reviews={reviews} />
            }

            {
                loading && !error && <ShimmerThumbnail height={250} width={250} rounded />
            }

            {
                error && !reviews && (
                    <div className="text-center flex items-center flex-col gap-4">
                        <BiError className='text-red-500 text-4xl text-center mt-8' />
                        <p className="mt-6 text-base leading-7 text-red-600">Couldn't find Reviews! {error}</p>
                    </div>
                )
            }

            {
                !error && reviews && reviews.length === 0 && <p className='text-center mt-8 text-xl text-red-500 font-semibold'>No reviews yet!</p>
            }

        </div>
    );
};

export default ReviewCarousel;
