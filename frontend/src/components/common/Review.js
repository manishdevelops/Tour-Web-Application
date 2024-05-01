import React, { useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { toast } from 'react-toastify';

const Review = ({ id }) => {

    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setRating(0);
        setReviewText('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rating, review: reviewText, tour: id
                })
            });

            if (!res.ok) {
                setLoading(false);
                const errorData = await res.json();
                toast.error(errorData.message);
                return;
            }

            const data = await res.json();
            console.log(data);
            setLoading(false);
            toast.success('review created successfully!');
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }

        handleClose();
    };

    return (
        <div className="bg-slate-50 p-6 rounded-lg shadow-lg w-full sm:w-[36rem]" >
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
        </div>
    );
};

export default Review;
