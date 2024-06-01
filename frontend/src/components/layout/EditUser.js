import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase';
import { ShimmerCircularImage, ShimmerThumbnail } from "react-shimmer-effects";

const EditUser = () => {
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photo: '',
        role: ''
    });
    const [updateLoading, setUpdateLoading] = useState(false);
    const [userLoading, setUserLoading] = useState(false);

    // const [user, setUser] = useState(null);
    // console.log(user);

    console.log(formData);

    const { userId } = useParams();
    console.log(userId);

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
            const res = await fetch(`/api/admin/edit-user/${userId}`, {
                method: 'PATCH',
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
            toast.success('User updated successfully!');
        } catch (error) {
            toast.error('User updation failed!');
            setUpdateLoading(false);
        }
    }

    const getUser = async () => {
        try {
            setUserLoading(true);
            const res = await fetch(`/api/users/${userId}`);
            if (!res.ok) {
                setUserLoading(false);
                const errorData = await res.json();
                return toast.error(errorData.message);
            }
            const data = await res.json();
            // setUser(data.data.user);
            setFormData({
                name: data.data.user.name,
                email: data.data.user.email,
                photo: data.data.user.photo,
                role: data.data.user.role
            });
            setUserLoading(false);

        } catch (error) {
            setUserLoading(false);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
        getUser();
    }, [file]);

    return (
        <>
            {!userLoading && (<div className='max-w-xs mx-auto'>
                <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                    <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*' />
                    <img onClick={() => fileRef.current.click()} src={formData.photo} alt='profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
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
                    <div className='grid grid-cols-2 items-center'>
                        <label htmlFor='name' className="block text-sm font-medium text-gray-700">name:</label>
                        <input type='text' placeholder='name' id='name' defaultValue={formData.name} className='border p-2 rounded-lg' onChange={handleChange} />
                    </div>

                    <div className='grid grid-cols-2 items-center'>
                        <label htmlFor='email' className="block text-sm font-medium text-gray-700">E-mail:</label>
                        <input type='text' placeholder='email' id='email' defaultValue={formData.email} className='border p-2 rounded-lg' onChange={handleChange} />
                    </div>

                    <div className='grid grid-cols-2 items-center'>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">User role:</label>
                        <select id="role" name='role' value={formData.role} onChange={handleChange} className=" p-2 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500">
                            <option value="" >update role</option>
                            <option value="user">user</option>
                            <option value="guide">guide</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>

                    <button disabled={updateLoading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-80 shadow-md'>{updateLoading ? 'Updating...' : 'Update'}</button>
                </form>
            </div>)
            }
            {
                userLoading && <ShimmerCircularImage size={150} />
            }
            {
                userLoading && <ShimmerThumbnail height={250} rounded />
            }
        </>
    )
}

export default EditUser;