import React from 'react';
import { Link } from 'react-router-dom';
import culturalImg from '../../assets/images/cultural-2.avif';
import adventureImg from '../../assets/images/adventure-2.jpg';
import beachImg from '../../assets/images/Beach-2.avif';
import cityImg from '../../assets/images/city-2.avif';
import natureImg from '../../assets/images/nature-2.jpg';
import safariImg from '../../assets/images/safari-2.avif';
import historyImg from '../../assets/images/history-2.jpg';
import MountainImg from '../../assets/images/mountain-2.jpg';
import sightImg from '../../assets/images/sight-2.jpg';
import { IoIosArrowRoundForward } from "react-icons/io";;


const TourBanner = () => {
    return (
        <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="text-center space-y-6">
                <h1 className="text-5xl font-bold text-gray-900">Plan Your Perfect Trip Today</h1>
                <p className="text-xl text-gray-500">
                    From hidden gems to world-famous landmarks, our tailored tours ensure you experience adventures that last a
                    lifetime. Start your journey with us.
                </p>
            </div>
            <div className="mt-12 grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-6">
                <Link to='/tours?tourType=Cultural'>
                    <div className='overflow-hidden rounded-lg'>
                        <img
                            alt="cultural tour"
                            className="w-full h-auto  hover:scale-105 transition-scale duration-300"
                            height="400"
                            src={culturalImg}
                            style={{
                                aspectRatio: "600/400",
                                objectFit: "cover",
                            }}
                            width="600"
                        />
                        <div className='my-4'>
                            <h2 className='font-bold text-xl text-gray-900'>Experince Cultural wonders <IoIosArrowRoundForward className='inline text-3xl' /></h2>
                            <p className='text-gray-500'>Dive deep into the cultures and traditions of each destination with our immersive tours. </p>
                        </div>
                    </div>
                </Link>
                <Link to='/tours?tourType=Adventureous'>
                    <div className='overflow-hidden rounded-lg'>
                        <img
                            alt="tourists moving in jungle"
                            className="w-full h-auto  hover:scale-105 transition-scale duration-300"
                            height="400"
                            src={adventureImg}
                            style={{
                                aspectRatio: "600/400",
                                objectFit: "cover",
                            }}
                            width="600"
                        />
                        <div className='my-4'>
                            <h2 className='font-bold text-xl text-gray-900'>Adventure Awaits <IoIosArrowRoundForward className='inline text-3xl' /></h2>
                            <p className='text-gray-500'>Thrill-seekers rejoice! Our adventure tours offer unforgettable experiences in breathtaking landscapes. . </p>
                        </div>
                    </div>
                </Link>

                <Link to='/tours?tourType=Beach Holidays'>
                    <div className='overflow-hidden rounded-lg'>
                        <img
                            alt="beach"
                            className="w-full h-auto  hover:scale-105 transition-scale duration-300"
                            height="400"
                            src={beachImg}
                            style={{
                                aspectRatio: "600/400",
                                objectFit: "cover",
                            }}
                            width="600"
                        />
                        <div className='my-4'>
                            <h2 className='font-bold text-xl text-gray-900'>Beach Gataways <IoIosArrowRoundForward className='inline text-3xl' /></h2>
                            <p className='text-gray-500'>Relax on pristine beaches and experience the ultimate seaside adventure. . . </p>
                        </div>
                    </div>
                </Link>

                <Link to='/tours?tourType=City Adventure'>
                    <div className='overflow-hidden rounded-lg'>
                        <img
                            alt="city"
                            className="w-full h-auto  hover:scale-105 transition-scale duration-300"
                            height="400"
                            src={cityImg}
                            style={{
                                aspectRatio: "600/400",
                                objectFit: "cover",
                            }}
                            width="600"
                        />
                        <div className='my-4'>
                            <h2 className='font-bold text-xl text-gray-900'>City Excursions <IoIosArrowRoundForward className='inline text-3xl' /></h2>
                            <p className='text-gray-500'>Discover the heartbeats of the world's most iconic cities with us. . . </p>
                        </div>
                    </div>
                </Link>
                <Link to='/tours?tourType=Natural Escapes'>
                    <div className='overflow-hidden rounded-lg'>
                        <img
                            alt="nature"
                            className="w-full h-auto  hover:scale-105 transition-scale duration-300"
                            height="400"
                            src={natureImg}
                            style={{
                                aspectRatio: "600/400",
                                objectFit: "cover",
                            }}
                            width="600"
                        />
                        <div className='my-4'>
                            <h2 className='font-bold text-xl text-gray-900'>Natural Escapes <IoIosArrowRoundForward className='inline text-3xl' /></h2>
                            <p className='text-gray-500'>Immerse in the untouched beauty of nature with our curated natural tours. . . </p>
                        </div>
                    </div>
                </Link>

                <Link to='/tours?tourType=Safari Tours'>
                    <div className='overflow-hidden rounded-lg'>
                        <img
                            alt="safari tour"
                            className="w-full h-auto  hover:scale-105 transition-scale duration-300"
                            height="400"
                            src={safariImg}
                            style={{
                                aspectRatio: "600/400",
                                objectFit: "cover",
                            }}
                            width="600"
                        />
                        <div className='my-4'>
                            <h2 className='font-bold text-xl text-gray-900'>Wildlife Safari <IoIosArrowRoundForward className='inline text-3xl' /></h2>
                            <p className='text-gray-500'>Embark on our Safari tours for an unforgettable journey through the wilderness. . . </p>
                        </div>
                    </div>
                </Link>
                <Link to='/tours?tourType=Historical'>
                    <div className='overflow-hidden rounded-lg'>
                        <img
                            alt="history tour"
                            className="w-full h-auto  hover:scale-105 transition-scale duration-300"
                            height="400"
                            src={historyImg}
                            style={{
                                aspectRatio: "600/400",
                                objectFit: "cover",
                            }}
                            width="600"
                        />
                        <div className='my-4'>
                            <h2 className='font-bold text-xl text-gray-900'>Live Again History <IoIosArrowRoundForward className='inline text-3xl' /></h2>
                            <p className='text-gray-500'>Our History tours dive deep into the past, exploring ancient sites and cities. . . </p>
                        </div>
                    </div>
                </Link>
                <Link to='/tours?tourType=Hill Stations'>
                    <div className='overflow-hidden rounded-lg'>
                        <img
                            alt="hill tour"
                            className="w-full h-auto  hover:scale-105 transition-scale duration-300"
                            height="400"
                            src={MountainImg}
                            style={{
                                aspectRatio: "600/400",
                                objectFit: "cover",
                            }}
                            width="600"
                        />
                        <div className='my-4'>
                            <h2 className='font-bold text-xl text-gray-900'>Enjoy Hill Stations <IoIosArrowRoundForward className='inline text-3xl' /></h2>
                            <p className='text-gray-500'>Climb the highest peaks and explore breathtaking landscapes on our Mountain tours. . . </p>
                        </div>
                    </div>
                </Link>
                <Link to='/tours?tourType=Sightseeing'>
                    <div className='overflow-hidden rounded-lg'>
                        <img
                            alt="sightseeing tour"
                            className="w-full h-auto  hover:scale-105 transition-scale duration-300"
                            height="400"
                            src={sightImg}
                            style={{
                                aspectRatio: "600/400",
                                objectFit: "cover",
                            }}
                            width="600"
                        />
                        <div className='my-4'>
                            <h2 className='font-bold text-xl text-gray-900'>Beautiful Sightseeing <IoIosArrowRoundForward className='inline text-3xl' /></h2>
                            <p className='text-gray-500'>Discover iconic landmarks and hidden gems on our Sightseeing tours. . . </p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default TourBanner;