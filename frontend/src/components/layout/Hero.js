import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore from 'swiper';
// import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
// import { ShimmerThumbnail } from "react-shimmer-effects";
import { FaArrowRightLong } from "react-icons/fa6";
// import { toast } from 'react-toastify';
// import { BiError } from "react-icons/bi";


const Hero = () => {

    const { currentUser } = useSelector(state => state.user);

    // SwiperCore.use([Navigation, Autoplay]);

    // const [tours, setTours] = useState(null);
    // const [error, setError] = useState(false);

    // useEffect(() => {

    //     const getTours = async () => {
    //         try {
    //             setError(false);
    //             const res = await fetch('/api/tours/getTours');
    //             if (!res.ok) {
    //                 setError(true);
    //                 const errorData = await res.json();
    //                 return toast.error(errorData.message);
    //             }
    //             setError(false);
    //             const data = await res.json();
    //             setTours(data.data.tours);
    //         } catch (error) {
    //             setError(true);
    //             toast.error(error.message);
    //         }
    //     }
    //     getTours()
    // }, []);

    return (
        <section className="w-full flex justify-center pt-12 px-10">
            <div className="container space-y-10 xl:space-y-16">
                <div className="grid gap-4  md:grid-cols-2 md:gap-16">
                    <div>
                        <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-gray-900">
                            Discover Incredible India
                        </h1>
                    </div>
                    <div className="flex flex-col items-start space-y-4">
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                            Unveil the beauty of India's majestic landscapes and rich culture with our curated tours crafted exclusively for the curious traveler.
                        </p>
                        <div className="space-x-4">
                            {
                                !currentUser && (<Link to='/sign-in'
                                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                                >
                                    Get Started
                                </Link>)
                            }
                            <Link to='/tours'
                                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50   text-center"
                            >
                                Explore <FaArrowRightLong className='ml-2' />
                            </Link>

                        </div>
                    </div>
                </div>
                {/* {
                    !error && tours && (<Swiper
                        navigation
                        autoplay={{ delay: 3000 }}
                    >
                        {
                            tours.map((tour) => (
                                <SwiperSlide key={tour.photos[0]}>
                                    <div className='h-[60vh]' style={{ background: `url(${tour.photos[0]}) center no-repeat`, backgroundSize: 'cover' }}>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>)
                }
                {
                    !error && !tours && <ShimmerThumbnail height={350} rounded />
                }
                {
                    !error && tours && tours.length === 0 && <p className='text-center mt-8 text-xl text-red-500 font-semibold'>Resouce not fround!</p>
                }

                {
                    error && (
                        <div className="text-center flex items-center flex-col gap-4">
                            <BiError className='text-red-500 text-4xl text-center mt-8' />
                            <p className="mt-6 text-base leading-7 text-red-600">Couldn't find resource, Please try after sometime.!</p>
                        </div>
                    )
                } */}
                <img
                    alt="Hero"
                    className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover"
                    height="300"
                    src="https://as1.ftcdn.net/v2/jpg/00/81/63/02/1000_F_81630240_8YPryJHBYgYTBGvMHHTTgYM00bVX3qM1.jpg"
                    width="1270"
                />
            </div>
        </section>
    )
}

export default Hero;