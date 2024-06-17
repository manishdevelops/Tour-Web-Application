import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const SignIn = () => {
    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            [e.target.id]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const res = await fetch(`/api/users/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, frontendUrl: window.location.origin })
            });

            if (!res.ok) {
                const errorData = await res.json();
                toast.error(errorData.message);
                setLoading(false);
                return;
            }

            toast.success('Email sent. Please check your mail!');
            setLoading(false);

            window.setTimeout(() => {
                navigate('/sign-in');
            }, 1500);

        } catch (error) {
            setLoading(false)
            toast.error(error.message);
        }
    }

    return (
        <div className='p-3 my-14 max-w-lg mx-auto'>
            <h2 className='text-3xl text-center font-semibold my-7'>Forgot Password</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                <input type='email' placeholder='Enter registered email...' className='border p-3 rounded-lg' id='email' onChange={handleChange} />

                <button disabled={loading} className='bg-blue-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'Sending...' : 'Send'}
                </button>

            </form>
        </div>
    )
}

export default SignIn;