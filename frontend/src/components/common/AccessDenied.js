import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";


const AccessDenied = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
                <p className="mt-4 text-gray-600">
                    You do not have the necessary permissions to access this page.
                </p>
                <div className="mt-6">
                    <Link to='/home' className="bg-black py-2 px-4 rounded-md  shadow-md hover:text-black hover:bg-slate-50 transition text-white"><FaArrowLeftLong className='inline' /> Go to Home </Link>
                </div>
            </div>
        </div>
    );
};

export default AccessDenied;
