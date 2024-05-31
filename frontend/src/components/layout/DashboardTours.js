import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShimmerTable } from "react-shimmer-effects";
import NotFound from '../pages/NotFound';
import { FaPlus } from "react-icons/fa";
import DeleteTour from '../common/DeleteTour';
import '../pages/Tours.css';
import { setDeleteTour } from '../../redux/user/userSlice';


const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry"
];

const DashboardTours = () => {
    const { currentUser, deleteTour } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [tours, setTours] = useState([]);
    const [tourLoading, setTourLoading] = useState(false);
    const [error, setError] = useState(false);
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        minPrice: 0,
        maxPrice: 50000,
        state: '',
        tourType: ''
    });
    // console.log(sidebarData)
    const [tourId, setTourId] = useState(null);

    const handleTourDeleted = (deletedTourId) => {
        setTours(tours.filter(tour => tour._id !== deletedTourId));
    };

    const handleChange = (e) => {
        setSidebarData({
            ...sidebarData, [e.target.id]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('minPrice', sidebarData.minPrice);
        urlParams.set('maxPrice', sidebarData.maxPrice);
        urlParams.set('state', sidebarData.state);
        urlParams.set('tourType', sidebarData.tourType);
        const searchQuery = urlParams.toString();

        navigate(`/dashboard/tours?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const minPriceFromUrl = urlParams.get('minPrice');
        const maxPriceFromUrl = urlParams.get('maxPrice');
        const stateFromUrl = urlParams.get('state');
        const tourTypeFromUrl = urlParams.get('tourType');
        urlParams.set('limit', '1000');

        if (searchTermFromUrl || minPriceFromUrl || maxPriceFromUrl || stateFromUrl || tourTypeFromUrl) {
            setSidebarData({
                searchTerm: searchTermFromUrl || '',
                minPrice: minPriceFromUrl || 0,
                maxPrice: maxPriceFromUrl || 100000,
                state: stateFromUrl || '',
                tourType: tourTypeFromUrl || ''
            });
        }

        const fetchTours = async () => {
            const searchQuery = urlParams.toString();
            try {
                setTourLoading(true);
                setError(false);
                const res = await fetch(`/api/tours/tourResults?${searchQuery}`);
                if (!res.ok) {
                    const errorData = await res.json();
                    setTourLoading(false);
                    setError(true);
                    return toast.error(errorData.message);
                }
                const data = await res.json();
                // console.log(data.data.tours)
                setTourLoading(false);
                setError(false);
                setTours(data?.data?.tours);
            } catch (error) {
                setTourLoading(false);
                setError(true);
                toast.error(error.message);
            }
        }

        fetchTours();

    }, [window.location.search]);

    return (
        <div className="p-4 h-screen overflow-y-auto">
            <div className='flex mb-4'>
                {
                    currentUser.role === 'admin' && (
                        <Link
                            to='/dashboard/create-tour'
                            className='bg-green-500 text-white rounded-lg p-3 uppercase text-center shadow-lg hover:text-green-500 hover:bg-white transition-all flex justify-center items-center'
                        >
                            create a new tour
                            <FaPlus className='text-lg ml-1' />
                        </Link>)
                }
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 mb-4 gap-4 gap-y-4 bg-white rounded-lg shadow-md p-2">
                <div className="flex flex-col">
                    <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                    <input type='text' id='searchTerm' placeholder='Search...' value={sidebarData.searchTerm} onChange={handleChange}
                        className='border rounded-lg p-2 w-full transition duration-300 ease-in-out focus:outline-none focus:border-blue-500'
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="minPrice">Min Price:</label>
                    <input
                        type="range"
                        id="minPrice"
                        name="minPrice"
                        min="0"
                        max="50000"
                        step="500"
                        value={sidebarData.minPrice}
                        onChange={handleChange}
                    />
                    <p>Min: ₹{sidebarData.minPrice}</p>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="maxPrice">Max Price:</label>
                    <input
                        type="range"
                        id="maxPrice"
                        name="maxPrice"
                        min="0"
                        max="50000"
                        step="500"
                        value={sidebarData.maxPrice}
                        onChange={handleChange}
                    />
                    <p>Max: ₹{sidebarData.maxPrice}</p>
                </div>

                <div className="flex flex-col xl:items-center">
                    <label htmlFor="state">Filter by state:</label>
                    <select id="state" onChange={handleChange} className="w-60 min-w-24 px-2 py-2 rounded-lg border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500">
                        <option value="">States</option>
                        {indianStates.map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col xl:items-center">
                    <label htmlFor="tourType">Filter by type:</label>
                    <select id="tourType" name='tourType' onChange={handleChange} className="w-60 min-w-24 px-2 py-2 rounded-lg border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500">
                        <option value="" >Types</option>
                        <option value="Sightseeing">Sightseeing</option>
                        <option value="Adventureous ">Adventure</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Historical">Historical</option>
                        <option value="Natural Escapes">Natural Escapes</option>
                        <option value="City Adventure">City Adventure</option>
                        <option value="Beach Holidays">Beach Holidays</option>
                        <option value="Hill Stations">Hill Stations</option>
                        <option value="Safari Tours">Safari Tour</option>
                    </select>
                </div>
                <div className='grid place-content-center'>
                    <button className='bg-slate-700 text-white px-4 py-2 rounded-lg uppercase hover:opacity-95'>Search</button>
                </div>

            </form>

            {
                !tourLoading && !error && tours.length > 0 &&

                <div className="lg:w-custom-256 w-custom-1rem overflow-x-scroll bg-white rounded-lg shadow-md">
                    <table className="w-[80rem] table-fixed border-collapse">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="w-28 p-2">S.No</th>
                                <th className=" p-2">Tour</th>
                                <th className=" p-2">Departure Date</th>
                                <th className=" p-2">Price</th>
                                <th className=" p-2">View</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tours.map((tour, index) => (

                                <tr key={tour._id} className="bg-white border-b">

                                    <td className="p-2 text-center w-28">{index + 1}</td>
                                    <td className="p-2">
                                        <div className="flex items-center">
                                            <img src={tour.photos[0]} alt={tour.tourName} className="w-20 h-10 mr-2" />
                                            <span>{tour.tourName}</span>
                                        </div>
                                    </td>
                                    <td className="p-2 text-center">{new Date(tour.departureDate).toLocaleDateString()}</td>
                                    <td className="p-2 text-center">₹{tour.price.toLocaleString('en-IN')}</td>
                                    <td className="p-2 text-center"><Link className='text-green-500 hover:underline font-semibold' to={`/tour-overview/${tour.slug}`}>View</Link></td>
                                    <td className="p-2 text-center">
                                        <button className="text-blue-500 hover:underline font-semibold"><Link to={`/dashboard/edit-tour/${tour._id}`}>Edit</Link></button>
                                        <button onClick={() => [dispatch(setDeleteTour(true)), setTourId(tour._id)]} className="text-red-500 hover:underline ml-2 font-semibold">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
            {
                deleteTour && <DeleteTour id={tourId} onTourDeleted={handleTourDeleted} />
            }

            {
                tourLoading && <ShimmerTable row={5} col={5} />
            }
            {
                error && <NotFound />
            }

        </div>
    );
};

export default DashboardTours;
