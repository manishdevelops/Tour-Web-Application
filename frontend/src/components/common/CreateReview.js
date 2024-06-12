import React, { useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import DisplayReviews from './DisplayReviews';

const CreateReview = ({ tour }) => {
    const { currentUser } = useSelector(state => state.user);

    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [loading, setLoading] = useState(false);
    const [reviewCreated, setReviewCreated] = useState(false);

    const handleClose = () => {
        setRating(0);
        setReviewText('');
    };

    const isTourBookedAready = async () => {
        try {
            const res = await fetch('/api/bookings/booked-already', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: currentUser._id,
                    tour: tour._id
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                return errorData.status;
            }

            toast.error('Please book this tour before leaving a review.');
            return 'not booked';
        } catch (error) {
            toast.error(error.message);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            return toast.error('Please login to continue.');
        }

        try {
            const isBooked = await isTourBookedAready();

            if (isBooked === 'not booked') return;

            setLoading(true);
            setReviewCreated(false);
            const res = await fetch(`/api/tours/${tour._id}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rating, photo: currentUser.photo, review: reviewText, name: currentUser.name,
                })
            });

            if (!res.ok) {
                setLoading(false);
                const errorData = await res.json();
                setReviewCreated(false);
                toast.error(errorData.message);
                return;
            }

            setReviewCreated(true);
            setLoading(false);
            toast.success('review created successfully!');
        } catch (error) {
            setLoading(false);
            setReviewCreated(false);
            toast.error(error.message);
        }

        handleClose();
    };

    return (
        <div className=" p-6 rounded-lg w-full mx-4 sm:w-[36rem]" >
            <h2 className="text-2xl font-bold mb-4 text-green-400">Share your experience...</h2>
            <form onSubmit={handleSubmit}>

                <Rating style={{ maxWidth: 250 }} value={rating} onChange={setRating} />
                <div className="mb-4">
                    <label className="block text-sm font-medium my-2 text-red-900">Review</label>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="w-full h-24 px-3 py-2 border rounded-md text-sm transition duration-300 ease-in-out focus:outline-none focus:border-blue-500"
                        placeholder="Leave a review..."
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <button type="button" onClick={() => handleClose()} className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md shadow-md mr-2">
                        Cancel
                    </button>
                    <button disabled={loading} type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow-md">
                        {loading ? 'Creating...' : 'Create'}
                    </button>
                </div>
            </form>
            <DisplayReviews key={reviewCreated ? 'review_created' : 'no_review_created'} id={tour._id} />
        </div>
    );
};

export default CreateReview;
