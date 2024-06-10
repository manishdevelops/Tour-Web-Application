import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ShimmerTable } from "react-shimmer-effects";
import NotFound from '../pages/NotFound';


const AssignedTours = () => {
    const [tours, setTours] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    console.log(tours);


    const getBookedTours = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/guides/get-assigned-tours`);
            if (!res.ok) {
                setLoading(false);
                const errorData = await res.json();
                return toast.error(errorData.message);
            }
            setLoading(false);
            const data = await res.json();
            setTours(data.data.tours);

        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getBookedTours();
    }, [])

    return (
        <div className="p-4 mt-8 h-screen overflow-y-auto f">

            {
                !loading && !error && tours?.length > 0 &&

                <div className="lg:w-custom-256 m-auto w-custom-1rem overflow-x-scroll bg-white rounded-lg shadow-md">
                    <table className="w-[80rem] table-fixed border-collapse">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="w-28 p-2">S.No</th>
                                <th className="p-2">Customer</th>
                                <th className="p-2">Tour</th>
                                <th className="p-2">Price</th>
                                <th className="p-2">Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tours.map((booking, index) => (

                                <tr key={booking._id} className="bg-white border-b">

                                    <td className="p-2 text-center w-28">{index + 1}</td>
                                    <td className="p-2 text-center">{booking.user.name}</td>
                                    <td className="p-2 text-center">{booking.tour.tourName}</td>
                                    <td className="p-2 text-green-600 text-center">₹{booking.price.toLocaleString('en-IN')}</td>
                                    <td className="p-2 text-center">{new Date(booking.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

            {
                loading && <ShimmerTable row={5} col={5} />
            }
            {
                error && <NotFound />
            }
            {
                tours?.length === 0 && <div className=' w-full text-center text-xl mt-20 font-semibold text-red-500'>No results found.</div>
            }
        </div>
    )
}

export default AssignedTours;