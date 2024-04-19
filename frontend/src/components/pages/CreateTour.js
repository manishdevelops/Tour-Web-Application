import React, { useState } from 'react';

function CreateTour() {
    const [formData, setFormData] = useState({
        tourName: '',
        location: '',
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prevState => ({
            ...prevState,
            photos: files
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10 lg:p-12 space-y-8">
            <h1 className="text-3xl sm:text-4xl font-bold">Create a New Tour</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="tourName" className="block text-sm font-medium text-gray-700">Tour Name:</label>
                    <input type="text" id="tourName" name="tourName" value={formData.tourName} onChange={handleChange} placeholder='Enter tour location' required className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location:</label>
                    <input type="text" id="location" name="location" placeholder='Enter tour location' value={formData.location} onChange={handleChange} required className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="tourDescription" className="block text-sm font-medium text-gray-700">Tour Description:</label>
                    <textarea id="tourDescription" name="tourDescription" placeholder='Enter tour description' value={formData.tourDescription} onChange={handleChange} required className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="tourDuration" className="block text-sm font-medium text-gray-700">Tour Duration:</label>
                    <input type="text" id="tourDuration" name="tourDuration" min='1' max='3' placeholder='Enter tour duration' value={formData.tourDuration} onChange={handleChange} required className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
                    <input type="number" id="price" name="price" placeholder='Enter the tour price' value={formData.price} onChange={handleChange} required className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700">Departure Date:</label>
                    <input type="date" id="departureDate" name="departureDate" placeholder='Enter departure date' value={formData.departureDate} min="2024-07-15" onChange={handleChange} required className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="tourGuide" className="block text-sm font-medium text-gray-700">Tour Guide:</label>
                    <input type="text" id="tourGuide" name="tourGuide" placeholder='Enter tour guide name' value={formData.tourGuide} onChange={handleChange} required className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700">Group Size:</label>
                    <input type="number" id="groupSize" name="groupSize" placeholder='Enter the group size' value={formData.groupSize} onChange={handleChange} required className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" min='6' max='20' />
                </div>
                <div className="space-y-2">
                    <label htmlFor="inclusions" className="block text-sm font-medium text-gray-700">Inclusions:</label>
                    <textarea id="inclusions" name="inclusions" placeholder='Enter provided facilities' value={formData.inclusions} onChange={handleChange} className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500"></textarea>
                </div>
                <div className="space-y-2">
                    <label htmlFor="exclusions" className="block text-sm font-medium text-gray-700">Exclusions:</label>
                    <textarea id="exclusions" name="exclusions" placeholder='Enter not provided facilities' value={formData.exclusions} onChange={handleChange} className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500"></textarea>
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label htmlFor="photos" className="block text-sm font-medium text-gray-700">Tour Photos:</label>
                    <input type="file" id="photos" name="photos" accept="image/*" multiple onChange={handlePhotoChange} className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude:</label>
                    <input type="number" id="latitude" name="latitude" placeholder='Enter latitude of the the location' value={formData.coordinates.latitude} onChange={(e) => handleChange({ target: { name: 'coordinates', value: { ...formData.coordinates, latitude: e.target.value } } })} required className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude:</label>
                    <input type="number" id="longitude" name="longitude" placeholder='Enter longitude of the the location' value={formData.coordinates.longitude} onChange={(e) => handleChange({ target: { name: 'coordinates', value: { ...formData.coordinates, longitude: e.target.value } } })} required className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>
                <div className="md:col-span-2 text-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Tour</button>
                </div>
            </form>
        </div>
    );
}

export default CreateTour;
