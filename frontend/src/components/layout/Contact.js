import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ShimmerSectionHeader } from "react-shimmer-effects";
import { LuMail } from "react-icons/lu";

export default function Contact({ tour }) {
    // console.log(tour);
    const [guide, setGuide] = useState(null);
    const [message, setMessage] = useState('');
    // console.log(guide)

    const onChange = (e) => {
        setMessage(e.target.value);
    }

    useEffect(() => {
        const fetchGuide = async () => {
            try {
                const res = await fetch(`/api/users/${tour.tourGuide}`);
                const data = await res.json();
                setGuide(data.data.user);
            } catch (error) {
                console.log(error);
            }
        }
        fetchGuide();

    }, [tour.tourGuide]);

    return (
        <div className='w-full bg-white rounded-sm shadow-sm p-4'>
            {guide && (
                <div className=' flex flex-col gap-2'>
                    <p> Contact <span className='font-semibold'>{guide.name}</span>, your tour guide for more about <span className='font-semibold text-red-900'>{tour.tourName.toLowerCase()}</span></p>
                    <textarea name='message' id='message' rows='2' value={message} onChange={onChange} className='w-full border p-3 rounded-lg'></textarea>

                    <Link to={`mailto:${guide.email}?subject=Regarding ${guide.name}&body=${message}`} className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95 flex justify-center items-center'><LuMail className='text-lg mr-2' />send message </Link>
                </div>
            )}
            {
                !guide && (
                    <div>
                        <ShimmerSectionHeader />
                        <ShimmerSectionHeader center />
                    </div>
                )
            }
        </div>
    );
}
