import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../redux/user/userSlice';

const ResetPassword = () => {
    const dispatch = useDispatch();

    const { token } = useParams();

    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };
    console.log(formData);

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await fetch(`/api/users/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            if (res.ok === false) {
                setLoading(false);
                const errorData = await res.json();
                return toast.error(errorData.message);
            }

            const data = await res.json();

            toast.success('Password Reset successfull.');
            dispatch(signInSuccess(data.data.user));

            window.setTimeout(() => {
                navigate('/home');
                toast.success('Your are now logged in.');

            }, 1500);
        } catch (error) {
            setLoading(false);
            return toast.error(error.message);
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h2 className='text-3xl text-center font-semibold my-7'>Reset Your Password</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                <input type='password' placeholder='new password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
                <input type='password' placeholder='confirm new password' className='border p-3 rounded-lg' id='passwordConfirm' onChange={handleChange} />
                <button className='bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'Reseting...' : 'Reset'}
                </button>
            </form>
        </div>
    )
}

export default ResetPassword;