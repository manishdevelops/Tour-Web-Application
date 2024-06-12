import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import DeleteContact from '../common/DeleteContact';
import NotFound from '../pages/NotFound';
import { ShimmerTable } from "react-shimmer-effects";
import { setDeleteContact } from '../../redux/user/userSlice';

import '../pages/Tours.css';


const DashboardUsers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { deleteContact } = useSelector(state => state.user);

    const [contactLoading, setContactLoading] = useState(false);
    const [error, setError] = useState(false);
    const [contactId, setContactId] = useState(null);
    const [contacts, setContacts] = useState(null);

    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
    });

    // console.log(contacts);
    const handleContactDeleted = (deletedContactId) => {
        setContacts(contacts.filter(contact => contact._id !== deletedContactId));
    };

    const handleChange = (e) => {
        setSidebarData({
            ...sidebarData, [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebarData.searchTerm);
        const searchQuery = urlParams.toString();

        navigate(`/dashboard/contacts?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');

        if (searchTermFromUrl) {
            setSidebarData({
                searchTerm: searchTermFromUrl || '',
            });
        }

        const fetchContacts = async () => {
            const searchQuery = urlParams.toString();
            try {
                setContactLoading(true);
                const res = await fetch(`/api/admin/contact-results?${searchQuery}`);
                if (!res.ok) {
                    const errorData = await res.json();
                    setError(true);
                    setContactLoading(false);
                    return toast.error(errorData.message);
                }
                setError(false);
                setContactLoading(false);
                const data = await res.json();
                setContacts(data.data.contacts);
            } catch (error) {
                setError(true);
                setContactLoading(false);
                toast.error(error.message);
            }
        }
        fetchContacts();
    }, [window.location.search]);

    return (
        <div className="p-4 h-screen overflow-y-auto">
            <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-4 mb-4 gap-4 gap-y-4 bg-white rounded-lg shadow-md p-2">
                <div className="flex flex-col">
                    <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                    <input type='text' id='searchTerm' placeholder='Search...' value={sidebarData.searchTerm} onChange={handleChange}
                        className='border rounded-lg p-2 w-full transition duration-300 ease-in-out focus:outline-none focus:border-blue-500'
                    />
                </div>

                <div className='grid place-content-center'>
                    <button className='bg-slate-700 text-white px-4 py-2 rounded-lg uppercase hover:opacity-95'>Search</button>
                </div>

            </form>


            {
                !contactLoading && !error && contacts?.length > 0 &&

                <div className="lg:w-custom-256 w-custom-1rem overflow-x-scroll bg-white rounded-lg shadow-md">
                    <table className="w-[80rem] table-fixed border-collapse">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="w-28 p-2">S.No</th>
                                <th className=" p-2">User</th>
                                <th className=" p-2">Query</th>
                                <th className=" p-2">E-mail</th>
                                <th className=" p-2">Phone</th>
                                <th className=" p-2">Query Date</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact, index) => (

                                <tr key={contact._id} className="bg-white border-b">

                                    <td className="p-2 text-center w-28">{index + 1}</td>
                                    <td className="p-2 text-center text-red-800">{contact.firstName + " " + contact.lastName}</td>
                                    <td className="p-2 text-center text-gray-600">{contact.message}</td>
                                    <td className="p-2 text-center text-blue-500">{contact.email}</td>
                                    <td className="p-2 text-center text-green-500">{contact.phoneNumber}</td>
                                    <td className="p-2 text-center">{new Date(contact.createdAt).toLocaleDateString()}</td>
                                    <td className="p-2 text-center">
                                        <button className="text-blue-500 hover:underline font-semibold"><Link to={`/dashboard/reply-contact/${contact._id}`}>Reply</Link></button>
                                        <button onClick={() => [dispatch(setDeleteContact(true)), setContactId(contact._id)]} className="text-red-500 hover:underline ml-2 font-semibold">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

            {
                deleteContact && <DeleteContact id={contactId} onContactDeleted={handleContactDeleted} />
            }

            {
                contactLoading && <ShimmerTable row={5} col={5} />
            }
            {
                error && <NotFound />
            }
            {
                contacts?.length === 0 && <div className=' w-full text-center text-xl mt-20 font-semibold text-red-500'>No results found.</div>
            }

        </div>
    )
}

export default DashboardUsers;