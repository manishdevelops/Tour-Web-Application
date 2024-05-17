import React, { useEffect, useState } from 'react';

const ReviewCarouselCard = ({ reviews }) => {
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentReviewIndex((prevIndex) =>
                prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(intervalId);
    }, [])

    return (
        <>
            {
                reviews.map((review, index) => (

                    <div
                        key={review._id}
                        className={`bg-gray-100 p-4 max-w-md w-full  shadow-md rounded-lg overflow-hidden ${index === currentReviewIndex ? 'block' : 'hidden'
                            }`}
                    >
                        <div className='flex justify-center mb-4'>
                            <img className='h-8 w-8 rounded-full mr-4' src={review.photo} alt='user' />
                            <h3 className="text-lg font-semibold mb-2">{review.name}</h3>
                        </div>
                        <p className="text-red-900 justify-center text-center">"{review.review}"</p>
                    </div>
                ))
            }
        </>
    )
}

export default ReviewCarouselCard;