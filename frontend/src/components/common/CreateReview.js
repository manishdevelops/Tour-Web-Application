import React, { useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import DisplayReviews from './DisplayReviews';

const CreateReview = ({ id }) => {
    const { currentUser } = useSelector(state => state.user);

    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [loading, setLoading] = useState(false);
    const [reviewCreated, setReviewCreated] = useState(false);

    const handleClose = () => {
        setRating(0);
        setReviewText('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setReviewCreated(false);
            const res = await fetch(`/api/tours/${id}/reviews`, {
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

            const data = await res.json();
            console.log(data);
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
            <h2 className="text-2xl font-bold mb-4 text-green-400">Write a Review...</h2>
            <form onSubmit={handleSubmit}>

                <Rating style={{ maxWidth: 250 }} value={rating} onChange={setRating} />
                <div className="mb-4">
                    <label className="block text-sm font-medium my-2 text-red-900">Review</label>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="w-full h-24 px-3 py-2 border rounded-md text-sm transition duration-300 ease-in-out focus:outline-none focus:border-blue-500"
                        placeholder="Write your review..."
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <button type="button" onClick={() => handleClose()} className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md shadow-md mr-2">
                        Cancel
                    </button>
                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow-md">
                        {loading ? 'Creating...' : 'Create'}
                    </button>
                </div>
            </form>
            <DisplayReviews key={reviewCreated ? 'review_created' : 'no_review_created'} id={id} />
        </div>
    );
};

export default CreateReview;
