import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns';
import StarRatings from 'react-star-ratings';
import { useSelector } from 'react-redux';

const DisplayReviews = ({ id }) => {
    const { currentUser } = useSelector(state => state.user);
    const [reviews, setReviews] = useState([]);
    const [seeAll, setSeeAll] = useState(true);
    const [seeLess, setSeeLess] = useState(false);

    const onSeeAllClick = async () => {
        const numberOfReviews = reviews.length;
        const startIndex = numberOfReviews;
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        try {
            const res = await fetch(`/api/tours/${id}/reviews?${searchQuery}`);
            if (!res.ok) {
                const errorData = await res.json();
                toast.error(errorData.message);
                return;
            }
            const data = await res.json();
            console.log(data);
            setSeeAll(false)
            setSeeLess(true);
            setReviews([...reviews, ...data.data]);

        } catch (error) {
            toast.error(error.message);
        }
    }

    const getReviews = async () => {
        try {
            const res = await fetch(`/api/tours/${id}/reviews`);
            if (!res.ok) {
                const errorData = await res.json();
                toast.error(errorData.message);
                return;
            }
            setSeeAll(true);
            setSeeLess(false);
            const data = await res.json();
            setReviews(data.data);

        } catch (error) {
            toast.error(error.message);
        }
    }

    const deleteYourReview = async (reviewId) => {
        try {
            const res = await fetch(`/api/tours/${id}/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                const errorData = await res.json();
                return toast.error(errorData.message);
            }
            toast.success('Review deleted successfully.');
            getReviews();

        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getReviews();

    }, [id]);

    return (
        <div className="mt-8 border-t border-gray-200 pt-8 ">
            {
                seeAll && (<div className="flex justify-end items-center mb-6">
                    <button onClick={onSeeAllClick} className="text-blue-500 text-sm font-medium bg-transparent underline rounded-md px-3 py-1 hover:bg-blue-500 hover:text-white">See All</button>
                </div>)
            }
            {
                seeLess && (<div className="flex justify-end items-center mb-6">
                    <button onClick={() => getReviews()} className="text-blue-500 text-sm font-medium bg-transparent underline rounded-md px-3 py-1 hover:bg-blue-500 hover:text-white">See Less</button>
                </div>)
            }
            {
                reviews.map((review) => (
                    <div key={review._id} className="space-y-6 my-4">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <img alt="User avatar" className="h-[2.5rem] w-[2.5rem] rounded-full" src={review.photo} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className='flex justify-between items-center'>
                                    <p className="text-sm font-medium text-gray-500">{review.name}</p>

                                    <StarRatings
                                        rating={review.rating}
                                        starRatedColor="gold"
                                        starDimension="25px"
                                        starSpacing="5px"
                                    />
                                </div>
                                <div className="flex items-center justify-between space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
                                    <span>{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}</span>
                                    {currentUser._id === review.user._id && (<button onClick={() => deleteYourReview(review._id)} className=' text-red-600 hover:underline'>Delete your review</button>)}
                                </div>
                                <p className="mt-3 text-sm text-gray-700">
                                    {review.review}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div >
    )
}

export default DisplayReviews;