import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaMapMarkerAlt, FaShare, FaRegClock } from 'react-icons/fa';
import { MdOutlineGroupAdd, MdDateRange } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { PiProhibitLight } from "react-icons/pi";
import { BsCheckLg } from "react-icons/bs";
import StarRatings from 'react-star-ratings';
import LeafletMap from '../layout/LeafletMap';
import ImageOverlap from '../layout/ImageOverlap';
import { useSelector } from 'react-redux';
import Contact from '../layout/Contact';
import Review from '../common/Review';

const TourOverview = ({ tour }) => {
    const { currentUser } = useSelector(state => state.user);

    const [contact, setContact] = useState(false);

    SwiperCore.use([Navigation, Autoplay]);

    const [copied, setCopied] = useState(false);

    return (
        <section>
            <Swiper
                navigation
                autoplay={{ delay: 3000 }}
            >
                {
                    tour[0].photos.map((url, i) => (
                        <SwiperSlide key={url}>
                            <div className='h-[80vh]' style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
                <FaShare
                    className='text-slate-500'
                    onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setCopied(true);
                        setTimeout(() => {
                            setCopied(false);
                        }, 2000);
                    }}
                />
            </div>
            {copied && (
                <p className='fixed top-[23%] right-[5%] z-10 text-green-500 rounded-md bg-slate-100 p-2'>
                    Link copied!
                </p>
            )}
            <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
                <p className='text-2xl font-semibold'>
                    {tour[0].tourName} - ₹{' '}
                    {
                        tour[0].price.toLocaleString('en-IN') + " / Person"
                    }
                </p>
                <p className='flex items-center mt-6 gap-2 text-slate-600 font-semibold text-sm'>
                    <FaMapMarkerAlt className='text-green-700' />
                    {tour[0].location}
                </p>
                <div className='flex flex-row max-sm:flex-col gap-4 max-sm:items-center'>
                    <h2 className='bg-red-900 w-full max-w-[150px] text-white text-center p-1 rounded-md'>Ratings:</h2>
                    <StarRatings
                        rating={tour[0].ratings}
                        starRatedColor="gold"
                        starDimension="30px"
                        starSpacing="5px"
                    />
                </div>
                <p className='text-slate-800 text-justify'>
                    <span className='font-semibold text-black'>Description - </span>
                    {tour[0].tourDescription}
                </p>

                <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                    <li className='flex items-center gap-1 whitespace-nowrap '>
                        <BiSolidCategory className='text-lg' />
                        <span className=''>{tour[0].tourType}</span>
                    </li>
                    <li className='flex items-center gap-1 whitespace-nowrap '>
                        <FaRegClock className='text-lg' />
                        <span className=''>{tour[0].tourDuration}</span>
                    </li>
                    <li className='flex items-center gap-1 whitespace-nowrap '>
                        <MdOutlineGroupAdd className='text-lg' />
                        <span className=''>{tour[0].groupSize} People</span>
                    </li>
                    <li className='flex items-center gap-1 whitespace-nowrap'>
                        <MdDateRange className='text-lg' />
                        <span>departuing on {new Date(tour[0].departureDate).toLocaleString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                    </li>
                </ul>
                <ul className='text-green-900 font-semibold text-sm'>
                    <li className='flex items-center gap-1'>
                        <BsCheckLg className='text-lg' /><span className='font-semibold mr-2 break-words '>  Inclusions: </span>  {tour[0].inclusions} and more
                    </li>
                    <li className='flex items-center gap-1 my-2' >
                        <PiProhibitLight className='text-lg' /><span className='font-semibold mr-2 break-words'> Exclusions: </span>  {tour[0].exclusions}
                    </li>
                </ul>
            </div>
            {/* <div className='flex max-w-4xl mx-auto p-3 my-7 '> */}
            <LeafletMap coordinates={tour[0].coordinates} tour={tour[0].tourName} />
            {/* </div> */}
            <div className=' text-center max-w-4xl mx-auto p-16 my-7 gap-4'>
                <div className=''>
                    <h2 className='mb-6 font-bold text-4xl text-green-500'>What are you waiting for?</h2>
                    <p className='mb-8 text-xl font-semibold text-red-900 italic'> {`${tour[0].tourDuration}. 1 adventure. Infinite memories. Make it yours today!`}</p>
                </div>
                <ImageOverlap photos={tour[0].photos} />
            </div>
            <div className='flex max-sm:flex-col justify-center items-center  max-w-4xl mx-auto p-16 my-7 gap-4'>
                {
                    currentUser && currentUser.role === 'user' && !contact && <button onClick={() => setContact(true)} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'>Contact Tour Guide</button>
                }
                {
                    contact && <Contact tour={tour[0]} />
                }
            </div>
            <div className='flex max-sm:flex-col justify-center items-center  max-w-4xl mx-auto px-16 pb-16 mb-7 gap-4'>
                <Review id={tour[0]._id} />
            </div>
        </section>
    )
}

export default TourOverview;