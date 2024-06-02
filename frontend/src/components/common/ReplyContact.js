import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import NotFound from '../pages/NotFound';
import { LuMail, LuPhone } from "react-icons/lu";
import { ShimmerThumbnail } from "react-shimmer-effects";


const ReplyContact = () => {
    const params = useParams();
    const { contactId } = params;

    const [error, setError] = useState(false);
    const [contactLoading, setContactLoading] = useState(false);
    const [contact, setContact] = useState(null);
    const [message, setMessage] = useState('');

    const onChange = (e) => {
        setMessage(e.target.value);
    }

    const getContact = async () => {
        try {
            setError(false);
            setContactLoading(true);
            const res = await fetch(`/api/contactUs/getContact/${contactId}`);

            if (!res.ok) {
                const errorData = await res.json();
                setContactLoading(false);
                setError(true);
                return toast.error(errorData.message);
            }
            setContactLoading(false);
            const data = await res.json();
            setContact(data.data.contact);
        } catch (error) {
            setError(true);
            setContactLoading(false);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getContact();
    }, []);


    return (
        <div className='flex flex-col items-center justify-center mt-8 p-4 sm:p-8'>
            {!contact && error && <NotFound />}
            {contactLoading && <p className='font-semibold'>Loading...</p>}
            {contact && !error && !contactLoading && (
                <div className='bg-white shadow-md rounded-lg p-6 w-full max-w-xl'>
                    <h2 className='text-2xl font-bold mb-4 text-gray-800'>Contact Information</h2>
                    <div className='mb-4'>
                        <div className='flex gap-2 mb-2'>
                            <span className='font-semibold'>User:</span>
                            <p>{contact.firstName + " " + contact.lastName}</p>
                        </div>
                        <div className='flex gap-2'>
                            <span className='font-semibold'>Query:</span>
                            <p>{contact.message}</p>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <textarea
                            name='message'
                            id='message'
                            rows='4'
                            value={message}
                            onChange={onChange}
                            className='w-full border p-3 rounded-lg mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-slate-500'
                            placeholder='Write your reply...'
                        ></textarea>
                        <Link
                            to={`mailto:${contact.email}?subject=Regarding ${contact.firstName}&body=${message}`}
                            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:bg-slate-600 transition duration-300 flex justify-center items-center'
                        >
                            <LuMail className='text-lg mr-2' /> Send Message
                        </Link>

                        <a
                            href={`tel:${contact.phoneNumber}`}
                            className='bg-green-500 mt-4 text-white text-center p-3 uppercase rounded-lg hover:bg-green-600 transition duration-300 flex justify-center items-center'
                        >
                            <LuPhone className='text-lg mr-2' /> Call {contact.phoneNumber}
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ReplyContact