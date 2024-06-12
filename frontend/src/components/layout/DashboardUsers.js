import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import DeleteUser from '../common/DeleteUser';
import NotFound from '../pages/NotFound';
import { ShimmerTable } from "react-shimmer-effects";
import { setDeleteUser } from '../../redux/user/userSlice';

import '../pages/Tours.css';


const DashboardUsers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { deleteUser } = useSelector(state => state.user);

    const [userLoading, setUserLoading] = useState(false);
    const [error, setError] = useState(false);
    const [userId, setUserId] = useState(null);
    const [users, setUsers] = useState(null);

    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        role: '',
        createdAt: ''
    });

    const handleUserDeleted = (deletedUserId) => {
        setUsers(users.filter(user => user._id !== deletedUserId));
    };

    const getCurrentDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
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
        urlParams.set('role', sidebarData.role);
        urlParams.set('createdAt', sidebarData.createdAt);
        const searchQuery = urlParams.toString();

        navigate(`/dashboard/users?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const roleFromUrl = urlParams.get('role');
        const registrationDateFromUrl = urlParams.get('createdAt');


        if (searchTermFromUrl || roleFromUrl || registrationDateFromUrl) {
            setSidebarData({
                searchTerm: searchTermFromUrl || '',
                role: roleFromUrl || '',
                createdAt: registrationDateFromUrl || '',
            });
        }

        const fetchUsers = async () => {
            const searchQuery = urlParams.toString();
            try {
                setUserLoading(true);
                const res = await fetch(`/api/admin/user-results?${searchQuery}`);
                if (!res.ok) {
                    const errorData = await res.json();
                    setError(true);
                    setUserLoading(false);
                    return toast.error(errorData.message);
                }
                setError(false);
                setUserLoading(false);
                const data = await res.json();
                setUsers(data.data.users);
            } catch (error) {
                setError(true);
                setUserLoading(false);
                toast.error(error.message);
            }
        }
        fetchUsers();
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

                <div className="flex flex-col ">
                    <label htmlFor="role" className='text-start'>Filter by role:</label>
                    <select id="role" name='role' onChange={handleChange} className="w-60 min-w-24 px-2 py-2 rounded-lg border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500">
                        <option value="" >Types</option>
                        <option value="user">user</option>
                        <option value="guide">guide</option>
                        <option value="admin">admin</option>
                    </select>
                </div>

                <div className='flex flex-col '>
                    <label htmlFor="createdAt">Registration Date:</label>
                    <input type="date" id="createdAt" name="createdAt" placeholder='Enter registration date' value={sidebarData.createdAt} max={getCurrentDate()} onChange={handleChange} className="w-full px-2 py-1 rounded border transition duration-300 ease-in-out focus:outline-none focus:border-blue-500" />
                </div>

                <div className='grid place-content-center'>
                    <button className='bg-slate-700 text-white px-4 py-2 rounded-lg uppercase hover:opacity-95'>Search</button>
                </div>

            </form>


            {
                !userLoading && !error && users?.length > 0 &&

                <div className="lg:w-custom-256 w-custom-1rem overflow-x-scroll bg-white rounded-lg shadow-md">
                    <table className="w-[80rem] table-fixed border-collapse">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="w-28 p-2">S.No</th>
                                <th className=" p-2">User</th>
                                <th className=" p-2">Role</th>
                                <th className=" p-2">E-mail</th>
                                <th className=" p-2">Registration Date</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (

                                <tr key={user._id} className="bg-white border-b">

                                    <td className="p-2 text-center w-28">{index + 1}</td>
                                    <td className="p-2">
                                        <div className="flex items-center">
                                            <img src={user.photo} alt={user.name} className="rounded-full w-[4rem] h-[4rem] mr-2" />
                                            <span className='text-red-800'>{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-2 text-center text-yellow-500">{user.role}</td>
                                    <td className="p-2 text-center text-blue-800">{user.email}</td>
                                    <td className="p-2 text-center">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="p-2 text-center">
                                        <button className="text-blue-500 hover:underline font-semibold"><Link to={`/dashboard/edit-user/${user._id}`}>Edit</Link></button>
                                        <button onClick={() => [dispatch(setDeleteUser(true)), setUserId(user._id)]} className="text-red-500 hover:underline ml-2 font-semibold">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

            {
                deleteUser && <DeleteUser id={userId} onUserDeleted={handleUserDeleted} />
            }

            {
                userLoading && <ShimmerTable row={5} col={5} />
            }
            {
                error && <NotFound />
            }
            {
                users?.length === 0 && <div className=' w-full text-center text-xl mt-20 font-semibold text-red-500'>No results found.</div>
            }

        </div>
    )
}

export default DashboardUsers;