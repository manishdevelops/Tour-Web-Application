import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShimmerThumbnail } from "react-shimmer-effects";
import TourCard from '../common/TourCard';
import './Tours.css';

const Tour = () => {
    const navigate = useNavigate();

    const [tours, setTours] = useState([]);
    console.log(tours);

    const [tourLoading, setTourLoading] = useState(false);

    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        minPrice: 0,
        maxPrice: 100000,
        state: '',
        tourType: ''
    });

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

        navigate(`/tours?${searchQuery}`);

    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const minPriceFromUrl = urlParams.get('minPrice');
        const maxPriceFromUrl = urlParams.get('maxPrice');
        const stateFromUrl = urlParams.get('state');
        const tourTypeFromUrl = urlParams.get('tourType');

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
                const res = await fetch(`/api/tours/tourResults?${searchQuery}`);
                if (!res.ok) {
                    const errorData = await res.json();
                    setTourLoading(false);
                    return toast.error(errorData.message);
                }
                const data = await res.json();
                console.log(data.data.tours)
                setTourLoading(false);
                setTours(data?.data?.tours);
            } catch (error) {
                setTourLoading(false);
                toast.error(error.message);
            }
        }

        fetchTours();

    }, [window.location.search])

    console.log(sidebarData)

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen md:w-[24rem]'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                        <input type='text' id='searchTerm' placeholder='Search...' value={sidebarData.searchTerm} onChange={handleChange}
                            className='border rounded-lg p-3 w-full'
                        />
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label htmlFor="minPrice">Min Price:</label>
                        <input
                            type="range"
                            id="minPrice"
                            name="minPrice"
                            min="10000"
                            max="100000"
                            step="1000"
                            value={sidebarData.minPrice}
                            onChange={handleChange}
                        />
                        <p>Min: ₹{sidebarData.minPrice}</p>
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label htmlFor="maxPrice">Max Price:</label>
                        <input
                            type="range"
                            id="maxPrice"
                            name="maxPrice"
                            min="10000"
                            max="100000"
                            step="1000"
                            value={sidebarData.maxPrice}
                            onChange={handleChange}
                        />
                        <p>Max: ₹{sidebarData.maxPrice}</p>
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label htmlFor="state">Filter by state:</label>
                        <select id="state" onChange={handleChange} className="w-60 px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500">
                            <option value="">states</option>
                            {indianStates.map((state, index) => (
                                <option key={index} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label htmlFor="tourType">Filter by type:</label>
                        <select id="tourType" name='tourType' onChange={handleChange} className="w-60 px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500">
                            <option value=""> tour type</option>
                            <option value="Sightseeing">Sightseeing</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Cultural">Historical</option>
                        </select>
                    </div>
                    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
                </form>
            </div>
            <div className='flex-1 h-screen overflow-y-auto bg-gray-50'>
                <h1 className='text-3xl font-semibold p-3 text-slate-700 mt-5 g'> Available tours:</h1>
                <div className='flex flex-wrap gap-4'>
                    {
                        tourLoading ? (<div className='p-4'>{Array.from({ length: 10 }).map((_, i) => <ShimmerThumbnail key={i} height={250} width={250} rounded />)}</div>) : <TourCard tours={tours} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Tour;