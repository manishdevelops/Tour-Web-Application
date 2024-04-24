import React, { useEffect, useState } from 'react'

const Tour = () => {

    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        minPrice: 0,
        maxPrice: 50000,
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

    // useEffect(() => {
    //     const allTour = async() => {
    //         const res = await fetch('/api/tours/')
    //     }
    // })

    console.log(sidebarData)

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
                <form className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                        <input type='text' id='searchTerm' placeholder='Search...' value={sidebarData.searchTerm} onChange={handleChange}
                            className='border rounded-lg p-3 w-full'
                        />
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label htmlFor="minPrice">Minimum Price:</label>
                        <input
                            type="range"
                            id="minPrice"
                            name="minPrice"
                            min="10000"
                            max="50000"
                            step="1000"
                            value={sidebarData.minPrice}
                            onChange={handleChange}
                        />
                        <p>Min: ₹{sidebarData.minPrice}</p>
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label htmlFor="maxPrice">Maximum Price:</label>
                        <input
                            type="range"
                            id="maxPrice"
                            name="maxPrice"
                            min="10000"
                            max="50000"
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
                            <option value="sightseeing">Sightseeing Tours</option>
                            <option value="adventure">Adventure Tours</option>
                            <option value="cultural">Cultural or Historical Tours</option>
                            <option value="specialty">Specialty Tours</option>
                        </select>
                    </div>
                    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
                </form>
            </div>
            <div className='flex-1'>
                <h1 className='text-3xl font-semibold border p-3 text-slate-700 mt-5'> Tour results:</h1>
                <div className='p-7 flex flex-wrap gap-4'>
                    tours
                </div>
            </div>
        </div>
    )
}

export default Tour;