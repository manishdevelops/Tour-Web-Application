import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ShimmerTable } from "react-shimmer-effects";
import { useSelector, useDispatch } from 'react-redux';
import { setDeletedBooking } from '../../redux/user/userSlice';
import NotFound from '../pages/NotFound';
import DeleteBooking from '../common/DeleteBooking';

const DashboardBookings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { deleteBooking } = useSelector(state => state.user);

    const [bookingLoading, setBookingLoading] = useState(false);
    const [error, setError] = useState(false);

    const [bookingId, setBookingId] = useState('');

    const [bookings, setBookings] = useState(null);

    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        price: '',
        createdAt: ''
    });

    const handleChange = (e) => {
        setSidebarData({
            ...sidebarData, [e.target.id]: e.target.value
        });
    };

    const getCurrentDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const handleBookingDeleted = (deletedBookingId) => {
        setBookings(bookings.filter(booking => booking._id !== deletedBookingId));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('price', sidebarData.price);
        urlParams.set('createdAt', sidebarData.createdAt);
        const searchQuery = urlParams.toString();

        navigate(`/dashboard/bookings?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const priceFromUrl = urlParams.get('price');
        const paymentDateFromUrl = urlParams.get('createdAt');


        if (searchTermFromUrl || priceFromUrl || paymentDateFromUrl) {
            setSidebarData({
                searchTerm: searchTermFromUrl || '',
                price: priceFromUrl || '',
                createdAt: paymentDateFromUrl || '',
            });
        }

        const fetchBookings = async () => {
            const searchQuery = urlParams.toString();
            try {
                setBookingLoading(true);
                const res = await fetch(`/api/admin/booking-results?${searchQuery}`);
                if (!res.ok) {
                    const errorData = await res.json();
                    setError(true);
                    setBookingLoading(false);
                    return toast.error(errorData.message);
                }
                setError(false);
                setBookingLoading(false);
                const data = await res.json();
                setBookings(data.data.bookings);
            } catch (error) {
                setError(true);
                setBookingLoading(false);
                toast.error(error.message);
            }
        }

        fetchBookings();
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

                <div className='flex flex-col '>
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" placeholder='Enter tour price' value={sidebarData.price} max={getCurrentDate()} onChange={handleChange} className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>

                <div className='flex flex-col '>
                    <label htmlFor="createdAt">Payment Date:</label>
                    <input type="date" id="createdAt" name="createdAt" placeholder='Enter payment date' value={sidebarData.createdAt} max={getCurrentDate()} onChange={handleChange} className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>

                <div className='grid place-content-center'>
                    <button className='bg-slate-700 text-white px-4 py-2 rounded-lg uppercase hover:opacity-95'>Search</button>
                </div>

            </form>

            {
                !bookingLoading && !error && bookings?.length > 0 &&

                <div className="lg:w-custom-256 w-custom-1rem overflow-x-scroll bg-white rounded-lg shadow-md">
                    <table className="w-[80rem] table-fixed border-collapse">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="w-28 p-2">S.No</th>
                                <th className="p-2">Customer</th>
                                <th className="p-2">Tour</th>
                                <th className="p-2">Price</th>
                                <th className="p-2">Payment Date</th>
                                <th className="p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (

                                <tr key={booking._id} className="bg-white border-b">

                                    <td className="p-2 text-center w-28">{index + 1}</td>
                                    <td className="p-2 text-center">{booking.user.name}</td>
                                    <td className="p-2 text-center">{booking.tour.tourName}</td>
                                    <td className="p-2 text-green-600 text-center">₹{booking.price.toLocaleString('en-IN')}</td>
                                    <td className="p-2 text-center">{new Date(booking.createdAt).toLocaleDateString()}</td>
                                    <td className="p-2 text-center">
                                        <button onClick={() => [dispatch(setDeletedBooking(true)), setBookingId(booking._id)]} className="text-red-500 hover:underline ml-2 font-semibold">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

            {
                deleteBooking && <DeleteBooking id={bookingId} onBookingDeleted={handleBookingDeleted} />
            }

            {
                bookingLoading && <ShimmerTable row={5} col={5} />
            }
            {
                error && <NotFound />
            }
            {
                bookings?.length === 0 && <div className=' w-full text-center text-xl mt-20 font-semibold text-red-500'>No results found.</div>
            }

        </div>
    )
}

export default DashboardBookings;