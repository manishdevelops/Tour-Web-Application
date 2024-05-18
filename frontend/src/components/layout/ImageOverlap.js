import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';


const ImageOverlap = ({ tour }) => {
    const { currentUser } = useSelector(state => state.user);

    const [processing, setProcessing] = useState(false);

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
                toast.error(errorData.message);
                return errorData.status;
            }


        } catch (error) {
            toast.error(error.message);
        }
    }

    const makePayment = async () => {

        try {
            const isBooked = await isTourBookedAready();

            if (isBooked === 'error') return;

            setProcessing(true);
            const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
            const body = {
                tour: tour,
                frontendUrl: window.location.origin
            }
            const headers = {
                "Content-Type": "application/json"
            }
            const response = await fetch("/api/bookings/create-checkout-session", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorData = response.json();
                setProcessing(false);
                return toast.error(errorData.message);
            }
            const session = await response.json();

            const result = stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result.error) {
                console.log(result.error);
            }
            setProcessing(false);

        } catch (error) {
            setProcessing(false);
            toast.error(error.message);
        }
    }

    return (
        <>
            <div className='mt-16 flex max-sm:flex-col justify-between items-center'>
                <div className="flex items-center relative">
                    <div className="relative z-10 max-sm:w-32 max-sm:h-32 w-64 h-64 rounded-full overflow-hidden">
                        <img
                            src={tour.photos[0]}
                            alt="Avatar 1"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute left-16 max-sm:left-8 top-4 z-20 max-sm:w-32 max-sm:h-32 w-64 h-64 rounded-full overflow-hidden">
                        <img
                            src={tour.photos[1]}
                            alt="Avatar 2"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute left-32 max-sm:left-16 top-8 z-30 max-sm:w-32 max-sm:h-32 w-64 h-64 rounded-full overflow-hidden">
                        <img
                            src={tour.photos[2]}
                            alt="Avatar 3"
                            className="w-full h-full object-cover"
                        />
                    </div>

                </div>
                {
                    currentUser?.role === 'user' && (
                        <button onClick={makePayment} className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md max-sm:mt-16">
                            {processing ? 'Processing...' : 'Book Now'}
                        </button>
                    )
                }
                {
                    !currentUser && (<Link to='/sign-in' className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md max-sm:mt-16">
                        Log in to book now
                    </Link>)
                }
            </div>
        </>
    );
};

export default ImageOverlap;
