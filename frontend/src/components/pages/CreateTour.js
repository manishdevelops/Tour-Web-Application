import React, { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const { app } = require('../../firebase');


function CreateTour() {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        tourName: '',
        location: '',
        ratings: '',
        tourType: '',
        tourDescription: '',
        tourDuration: '',
        price: '',
        departureDate: '',
        tourGuide: '',
        groupSize: '',
        inclusions: '',
        exclusions: '',
        photos: [],
        coordinates: { latitude: '', longitude: '' }
    });

    console.log(formData);

    const [uploading, setUploading] = useState(false);
    const [tourCreating, setTourCreating] = useState(false);
    const [imageUploadError, setImageUploadError] = useState(false);

    const [files, setFiles] = useState([]);
    console.log(files);

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(progress);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    })
                }
            )
        });
    }

    const handleImageSubmit = () => {
        if (files.length > 0 && files.length + formData.photos.length < 7) {
            setUploading(true);
            const promises = [];
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({
                    ...formData, photos: formData.photos.concat(urls)
                });
                setImageUploadError(false);
                setUploading(false);
            }).catch(err => {
                setImageUploadError('Image upload failed (2 mb max per image');
                setUploading(false);
            });
        } else {
            setImageUploadError('You can only upload 6 images per tour! ');
            setUploading(false);
        }
    }

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            photos: formData.photos.filter((_, i) => i !== index),
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        if (formData.photos.length < 1) return toast.error('You must upload at least three images!');

        try {
            setTourCreating(true);
            const res = await fetch(`/api/admin/createTour`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                toast.error(errorData.message);
                setTourCreating(false);
                return;
            }

            const data = await res.json();
            console.log(data.data);

            toast.success('tour created successfully!.');
            navigate('/tours');
        } catch (error) {
            console.log(error)
            setTourCreating(false);
            toast.error(error.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10 lg:p-12 space-y-8">
            <h1 className="text-3xl sm:text-4xl font-bold">Create a New Tour</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="tourName" className="block text-sm font-medium text-gray-700">Tour Name:</label>
                    <input type="text" id="tourName" name="tourName" value={formData.tourName} onChange={handleChange} placeholder='Enter tour location' className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location:</label>
                    <input type="text" id="location" name="location" placeholder='Enter tour location' value={formData.location} onChange={handleChange} className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="tourDescription" className="block text-sm font-medium text-gray-700">Tour Description:</label>
                    <textarea id="tourDescription" name="tourDescription" placeholder='Enter tour description' value={formData.tourDescription} onChange={handleChange} className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="tourDuration" className="block text-sm font-medium text-gray-700">Tour Duration:</label>
                    <input type="text" id="tourDuration" name="tourDuration" min='1' max='3' placeholder='Enter tour duration' value={formData.tourDuration} onChange={handleChange} className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
                    <input type="number" id="price" name="price" placeholder='Enter the tour price' value={formData.price} onChange={handleChange} className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700">Departure Date:</label>
                    <input type="date" id="departureDate" name="departureDate" placeholder='Enter departure date' value={formData.departureDate} min="2024-07-15" onChange={handleChange} className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="tourGuide" className="block text-sm font-medium text-gray-700">Tour Guide:</label>
                    <input type="text" id="tourGuide" name="tourGuide" placeholder='Enter tour guide name' value={formData.tourGuide} onChange={handleChange} className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700">Group Size:</label>
                    <input type="number" id="groupSize" name="groupSize" placeholder='Enter the group size' value={formData.groupSize} onChange={handleChange} className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" min='6' max='50' />
                </div>
                <div className="space-y-2">
                    <label htmlFor="inclusions" className="block text-sm font-medium text-gray-700">Inclusions:</label>
                    <textarea id="inclusions" name="inclusions" placeholder='Enter provided facilities' value={formData.inclusions} onChange={handleChange} className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500"></textarea>
                </div>
                <div className="space-y-2">
                    <label htmlFor="exclusions" className="block text-sm font-medium text-gray-700">Exclusions:</label>
                    <textarea id="exclusions" name="exclusions" placeholder='Enter not provided facilities' value={formData.exclusions} onChange={handleChange} className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500"></textarea>
                </div>
                <div className="space-y-2">
                    <label htmlFor="ratings" className="block text-sm font-medium text-gray-700">Ratings:</label>
                    <input type="number" id="ratings" name="ratings" placeholder='Enter ratings' value={formData.ratings} onChange={handleChange} className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>

                <div className='space-y-2'>
                    <label htmlFor="tourType">Select Tour Type:</label>
                    <select id="tourType" name='tourType' value={formData.type} onChange={handleChange} className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500">
                        <option value="">Select a tour type</option>
                        <option value="sightseeing">Sightseeing Tours</option>
                        <option value="adventure">Adventure Tours</option>
                        <option value="cultural">Cultural or Historical Tours</option>
                        <option value="specialty">Specialty Tours</option>
                    </select>
                </div>


                <div className="space-y-2 md:col-span-2">
                    <div className='flex gap-4'>
                        <label htmlFor="photos" className="block text-sm font-medium text-gray-700">Tour Photos:</label>
                        <input type="file" id="photos" name="photos" accept="image/*" multiple required onChange={(e) => setFiles(e.target.files)} className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                        <button disabled={uploading} type="button" onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>{uploading ? 'Uploading...' : 'Upload'}</button>
                    </div>
                    <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>
                    {
                        formData.photos.length > 0 && formData.photos.map((url, index) => (
                            <div key={url} className="flex justify-around p-3  items-center">
                                <img src={url} alt="listing-img" className="w-20 h-20 object-cover rounded-lg" />
                                <button type='button' onClick={() => handleRemoveImage(index)} className="p-3 text-red-700 rounded-lg uppercase hover:opacity-95">Delete</button>
                            </div>
                        ))
                    }
                </div>

                <div className="space-y-2">
                    <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude:</label>
                    <input type="number" id="latitude" name="latitude" placeholder='Enter latitude of the the location' required value={formData.coordinates.latitude} onChange={(e) => handleChange({ target: { name: 'coordinates', value: { ...formData.coordinates, latitude: e.target.value } } })} className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude:</label>
                    <input type="number" id="longitude" name="longitude" placeholder='Enter longitude of the the location' required value={formData.coordinates.longitude} onChange={(e) => handleChange({ target: { name: 'coordinates', value: { ...formData.coordinates, longitude: e.target.value } } })} className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>
                <div className="md:col-span-2 text-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{tourCreating ? 'Creating...' : 'Create Tour'}</button>
                </div>
            </form>
        </div>
    );
}

export default CreateTour;
