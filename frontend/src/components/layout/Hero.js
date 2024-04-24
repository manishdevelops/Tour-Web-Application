import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Hero = () => {
    const { currentUser } = useSelector(state => state.user);

    return (
        <section className="w-full pt-12 md:pt-24 lg:pt-32">
            <div className="container space-y-10 xl:space-y-16">
                <div className="grid gap-4 px-10 md:grid-cols-2 md:gap-16">
                    <div>
                        <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
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
                                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                            >
                                View tours
                            </Link>

                        </div>
                    </div>
                </div>
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