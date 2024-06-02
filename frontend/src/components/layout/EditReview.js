import React, { useState, useEffect } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EditReview = () => {
    const params = useParams();
    const { reviewId } = params;

    const [review, setReview] = useState({
        rating: '',
        review: ''
    });
    const [rating, setRating] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpdateReview = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/admin/edit-review/${reviewId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ review: reviewText, rating })
            });
            if (!res.ok) {
                const errorData = await res.json();
                setLoading(false);
                return toast.error(errorData.message);
            }
            setLoading(false);
            toast.success('Review updated successfully!');
        } catch (error) {
            toast.error('Review updation failed!');
            setLoading(false);
        }
    }

    const getReview = async () => {
        try {
            const res = await fetch(`/api/admin/get-review/${reviewId}`);

            if (!res.ok) {
                const errorData = await res.json();
                return toast.error(errorData.message);
            }

            const data = await res.json();
            setReview(data.data.review);
            setRating(data.data.review.rating);
            setReviewText(data.data.review.review);

        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getReview();
    }, [])

    return (
        <div className="m-auto p-6 rounded-lg w-full mx-4 sm:w-[36rem]" >
            <h2 className="text-2xl font-bold mb-4 text-green-400">Update Review...</h2>
            <form onSubmit={handleUpdateReview}>

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
                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow-md">
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditReview;