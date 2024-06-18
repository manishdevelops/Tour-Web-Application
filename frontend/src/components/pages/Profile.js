import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUserSuccess, setActiveAccount, setLogoutAccount } from '../../redux/user/userSlice';
import DeactivateAccount from '../common/DeactivateAccount';
import LogoutAccount from '../common/LogoutAccount';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase';

const Profile = () => {
    const { currentUser, deactivateAccount, logoutAccount } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateLoading, setUpdateLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress));
            },
            (error) => {
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
                    setFormData({ ...formData, photo: downloadURL })
                );
            }
        );

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setUpdateLoading(true);
            const res = await fetch(`/api/users/updateMe/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!res.ok) {
                const errorData = await res.json();
                setUpdateLoading(false);
                return toast.error(errorData.message);
            }
            const data = await res.json();

            setUpdateLoading(false);
            dispatch(updateUserSuccess(data.data.user));
            toast.success('User updated successfully!');
            setFormData({});
        } catch (error) {
            toast.error('User updation failed!');
            setUpdateLoading(false);
        }
    }

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*' />
                <img onClick={() => fileRef.current.click()} src={formData.photo || currentUser.photo} alt='profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
                <p className='text-sm self-center'>
                    {fileUploadError ? (
                        <span className='text-red-700'>
                            Error Image upload (image must be less than 2 mb)
                        </span>
                    ) : filePerc > 0 && filePerc < 100 ? (
                        <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
                    ) : filePerc === 100 ? (
                        <span className='text-green-700'>Image successfully uploaded!</span>
                    ) : (
                        ''
                    )}
                </p>

                <input type='text' placeholder='username' id='name' defaultValue={currentUser.name} className='border p-3 rounded-lg' onChange={handleChange} />
                <input type='text' placeholder='email' id='email' defaultValue={currentUser.email} className='border p-3 rounded-lg' onChange={handleChange} />
                <input type='password' placeholder='current password' id='currentPassword' className='border p-3 rounded-lg' onChange={handleChange} />
                <input type='password' placeholder='new password' id='newPassword' className='border p-3 rounded-lg' onChange={handleChange} />
                <button disabled={updateLoading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-80 shadow-md'>{updateLoading ? 'Updating...' : 'Update'}</button>
            </form>
            <div className='flex justify-between mt-5'>
                <span onClick={() => dispatch(setActiveAccount(true))} className='inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 cursor-pointer hover:opacity-80 shadow-md'>
                    Deactivate account</span>
                {deactivateAccount ? <DeactivateAccount /> : ''}
                <span onClick={() => dispatch(setLogoutAccount(true))} className='inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 cursor-pointer hover:opacity-80 shadow-md'>Log out</span>
                {logoutAccount ? <LogoutAccount /> : ''}
            </div>
        </div>
    )
}

export default Profile;