import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import DeleteReview from '../common/DeleteReview';
import NotFound from '../pages/NotFound';
import { ShimmerTable } from "react-shimmer-effects";
import { setDeleteReview } from '../../redux/user/userSlice';

import '../pages/Tours.css';


const DashboardReviews = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { deleteReview } = useSelector(state => state.user);

    const [reviewLoading, setReviewLoading] = useState(false);
    const [error, setError] = useState(false);
    const [reviewId, setReviewId] = useState(null);
    const [reviews, setReviews] = useState(null);

    const [sidebarData, setSidebarData] = useState({
        searchTerm: ''
    });

    const handleReviewDeleted = (deletedReviewId) => {
        setReviews(reviews.filter(user => user._id !== deletedReviewId));
    };

    const handleChange = (e) => {
        setSidebarData({
            ...sidebarData, [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebarData.searchTerm);
        const searchQuery = urlParams.toString();

        navigate(`/dashboard/reviews?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');

        if (searchTermFromUrl) {
            setSidebarData({
                searchTerm: searchTermFromUrl || '',
            });
        }

        const fetchReviews = async () => {
            const searchQuery = urlParams.toString();
            try {
                setReviewLoading(true);
                const res = await fetch(`/api/admin/review-results?${searchQuery}`);
                if (!res.ok) {
                    const errorData = await res.json();
                    setError(true);
                    setReviewLoading(false);
                    return toast.error(errorData.message);
                }
                setError(false);
                setReviewLoading(false);
                const data = await res.json();
                setReviews(data.data.reviews);
            } catch (error) {
                setError(true);
                setReviewLoading(false);
                toast.error(error.message);
            }
        }
        fetchReviews();
    }, [window.location.search]);

    return (
        <div className="p-4 h-screen overflow-y-auto">
            <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-4 mb-4 gap-4 gap-y-4 bg-white rounded-lg shadow-md p-2">
                <div className="flex flex-col">
                    <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                    <input type='text' id='searchTerm' placeholder='Search...' value={sidebarData.searchTerm} onChange={handleChange}
                        className='border rounded-lg p-2 w-full transition duration-300 ease-in-out focus:outline-none focus:border-blue-500'
                    />
                </div>

                <div className='grid place-content-center'>
                    <button className='bg-slate-700 text-white px-4 py-2 rounded-lg uppercase hover:opacity-95'>Search</button>
                </div>

            </form>


            {
                !reviewLoading && !error && reviews?.length > 0 &&

                <div className="lg:w-custom-256 w-custom-1rem overflow-x-scroll bg-white rounded-lg shadow-md">
                    <table className="w-[80rem] table-fixed border-collapse">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="w-28 p-2">S.No</th>
                                <th className=" p-2">User</th>
                                <th className=" p-2">Tour</th>
                                <th className=" p-2">Review</th>
                                <th className=" p-2">Review Date</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review, index) => (

                                <tr key={review._id} className="bg-white border-b">

                                    <td className="p-2 text-center w-28">{index + 1}</td>
                                    <td className="p-2">
                                        <div className="flex items-center">
                                            <img src={review.photo} alt={review.name} className="rounded-full w-20 h-10 mr-2" />
                                            <span>{review.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-2 text-center">{review.tour.tourName}</td>
                                    <td className="p-2 "><div className='max-h-24 overflow-y-auto'>{review.review}</div></td>
                                    <td className="p-2 text-center">{new Date(review.createdAt).toLocaleDateString()}</td>
                                    <td className="p-2 text-center">
                                        <button className="text-blue-500 hover:underline font-semibold"><Link to={`/dashboard/edit-review/${review._id}`}>Edit</Link></button>
                                        <button onClick={() => [dispatch(setDeleteReview(true)), setReviewId(review._id)]} className="text-red-500 hover:underline ml-2 font-semibold">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

            {
                deleteReview && <DeleteReview id={reviewId} onReviewDeleted={handleReviewDeleted} />
            }

            {
                reviewLoading && <ShimmerTable row={5} col={5} />
            }

            {
                error && <NotFound />
            }

            {
                reviews?.length === 0 && <div className=' w-full text-center text-xl mt-20 font-semibold text-red-500'>No results found.</div>
            }

        </div>
    )
}

export default DashboardReviews;