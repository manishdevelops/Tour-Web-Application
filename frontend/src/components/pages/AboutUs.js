import AboutUsBg from '../../assets/images/AboutUsBg3.jpg';
import { IoMdCheckmark } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Component() {
    const { currentUser } = useSelector(state => state.user);

    return (
        <>
            <section className="relative h-[80vh] w-full overflow-hidden">
                <img
                    alt="Scenic landscape"
                    className="h-full w-full object-cover object-center"
                    height={1080}
                    src={AboutUsBg}
                    style={{
                        aspectRatio: "1920/1080",
                        objectFit: "cover",
                    }}
                    width={1920}
                />
                <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                    <div className="text-center text-white space-y-4 px-4 md:px-6">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Discover the Vibrant Heart of India</h1>
                        <p className="text-lg md:text-xl">
                            Explore the most breathtaking destinations and create unforgettable memories with our TourGuru app.
                        </p>
                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
                            {
                                !currentUser ? (<Link to='/sign-in' className="bg-black py-2 px-4 rounded-md  shadow-md hover:text-black hover:bg-slate-50 transition">Get Started <FaArrowRightLong className='inline' /></Link>) : (<Link to='/tours' className="bg-black py-2 px-4 rounded-md  shadow-md hover:text-black hover:bg-slate-50 transition">Explore <FaArrowRightLong className='inline' /></Link>)
                            }
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
                            <p className="text-gray-500 dark:text-gray-400">
                                At our TourGuru app, our mission is to inspire and empower adventurous travelers to explore the India's
                                most breathtaking destinations. We believe that travel has the power to broaden horizons, foster
                                cultural understanding, and create lifelong memories.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tight">Our Values</h2>
                            <ul className="space-y-2 text-gray-500 dark:text-gray-400">
                                <li>
                                    <IoMdCheckmark className="mr-2 inline-block h-4 w-4 text-green-500" />
                                    Authenticity: We celebrate the unique cultural heritage and traditions of the destinations we feature.
                                </li>
                                <li>
                                    <IoMdCheckmark className="mr-2 inline-block h-4 w-4 text-green-500" />
                                    Sustainability: We promote eco-friendly travel practices and support local communities.
                                </li>
                                <li>
                                    <IoMdCheckmark className="mr-2 inline-block h-4 w-4 text-green-500" />
                                    Personalization: We tailor our recommendations to each traveler's preferences and interests.
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tight">Our Motivation</h2>
                            <ul className="space-y-2 text-gray-500 dark:text-gray-400">
                                <li>
                                    At TourGuru, our passion for India's rich culture, diverse heritage, and breathtaking landscapes drives us forward. We believe in crafting personalized journeys that create lasting memories for every traveler. By leveraging technology, we're dedicated to simplifying travel planning and enhancing exploration experiences
                                </li>
                                <li>
                                    Our mission is to uncover India's hidden treasures and showcase its unparalleled beauty to the world. Through our efforts, we aim to inspire responsible and immersive travel, fostering a deep appreciation for India's cultural and natural wonders. Together, let's cherish and preserve this heritage for generations to come.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-gray-100 py-12 md:py-24 lg:py-32 dark:bg-gray-800">
                <div className=" px-4 md:px-6">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tight text-yellow-50">Key Features</h2>
                            <ul className="space-y-2 text-gray-500 dark:text-gray-400">
                                <li>
                                    <IoMdCheckmark className="mr-2 inline-block h-4 w-4 text-green-500" />
                                    Personalized travel recommendations based on your preferences
                                </li>
                                <li>
                                    <IoMdCheckmark className="mr-2 inline-block h-4 w-4 text-green-500" />
                                    Detailed destination guides with information on attractions, and local cuisine
                                </li>
                                <li>
                                    <IoMdCheckmark className="mr-2 inline-block h-4 w-4 text-green-500" />
                                    Seamless booking and planning tools to help you organize your trips
                                </li>
                                <li>
                                    <IoMdCheckmark className="mr-2 inline-block h-4 w-4 text-green-500" />
                                    Offline access to maps and guides for your travels
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tight text-yellow-50">Benefits</h2>
                            <ul className="space-y-2 text-gray-500 dark:text-gray-400">
                                <li>
                                    <IoMdCheckmark className="mr-2 inline-block h-4 w-4 text-green-500" />
                                    Discover new and exciting destinations tailored to your interests
                                </li>
                                <li>
                                    <IoMdCheckmark className="mr-2 inline-block h-4 w-4 text-green-500" />
                                    Save time and money by planning your trips efficiently
                                </li>
                                <li>
                                    <IoMdCheckmark className="mr-2 inline-block h-4 w-4 text-green-500" />
                                    Immerse yourself in local cultures and create unforgettable memories
                                </li>
                                <li>
                                    <IoMdCheckmark className="mr-2 inline-block h-4 w-4 text-green-500" />
                                    Contribute to sustainable tourism and support local communities
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tight text-yellow-50">Why Choose Us?</h2>
                            <p className="!mb-4 text-gray-500 dark:text-gray-400 ">
                                Our tourism app is designed to be your ultimate travel companion. With our personalized recommendations,
                                detailed guides, and seamless planning tools, you can explore the India's beauty with confidence and ease. Join
                                us on an unforgettable journey and discover the beauty and wonder of the destinations you've always
                                dreamed of visiting.
                            </p>
                            {
                                !currentUser ? (<Link to='/sign-in' className="bg-black py-2 px-4 rounded-md  shadow-md hover:text-black hover:bg-slate-50 transition text-white">Get Started <FaArrowRightLong className='inline' /></Link>) : (<Link to='/tours' className="bg-black py-2 px-4 rounded-md  shadow-md hover:text-black hover:bg-slate-50 transition text-white">Explore <FaArrowRightLong className='inline' /></Link>)
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

