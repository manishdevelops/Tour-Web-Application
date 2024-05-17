import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OAuth from '../OAuth/OAuth';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../redux/user/userSlice';


const SignIn = () => {
    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            if (!res.ok) {
                const errorData = await res.json();
                toast.error(errorData.message);
                setLoading(false)
                return;
            }

            const data = await res.json();
            console.log(data.data)

            toast.success('User logged in successfully!.');
            dispatch(signInSuccess(data.data.user));
            navigate('/tours');

        } catch (error) {
            setLoading(false)
            toast.error(error.message);
        }
    }

    return (
        <div className='p-3 my-14 max-w-lg mx-auto'>
            <h2 className='text-3xl text-center font-semibold my-7'>Sign In</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
                <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
                <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'Logging in...' : 'Sign In'}
                </button>
                <OAuth />
            </form>
            <div className='flex gap-2 mt-5'>
                <p> Don't have an account?</p>
                <Link to='/sign-up'>
                    <span className='text-blue-700'>
                        Sign up
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default SignIn